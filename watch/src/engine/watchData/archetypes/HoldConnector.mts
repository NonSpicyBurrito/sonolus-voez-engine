import { options } from '../../configuration/options.mjs'
import { effect } from '../effect.mjs'
import { note, noteLayout } from '../note.mjs'
import { effectLayout, particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    data = this.defineData({
        headRef: { name: 'headRef', type: Number },
        tailRef: { name: 'tailRef', type: Number },
    })

    initialized = this.entityMemory(Boolean)

    trackRef = this.entityMemory(Number)

    head = this.entityMemory({
        time: Number,
    })

    tail = this.entityMemory({
        time: Number,
    })

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    holdEffectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    zs = this.entityMemory({
        connector: Number,
        slide: Number,
    })

    preprocessOrder = 1
    preprocess() {
        this.trackRef = this.headData.trackRef

        this.head.time = bpmChanges.at(this.headData.beat).time
        this.tail.time = bpmChanges.at(this.tailData.beat).time

        this.visualTime.min = this.head.time - note.duration
        this.visualTime.max = this.tail.time

        if (this.shouldSpawnLines) {
            for (let time = this.head.time + 0.08; time < this.tail.time; time += 0.08) {
                archetypes.HoldLine.spawn({
                    time,
                    trackRef: this.trackRef,
                })
            }
        }

        if (options.sfxEnabled) {
            const id = effect.clips.hold.scheduleLoop(this.head.time)
            effect.clips.scheduleStopLoop(id, this.tail.time)
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.visualTime.max
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        this.renderConnector()

        if (time.skip) if (this.shouldScheduleHoldEffect) this.holdEffectInstanceId = 0

        if (time.now < this.head.time) return

        if (this.shouldScheduleHoldEffect && !this.holdEffectInstanceId) this.spawnHoldEffect()

        if (this.holdEffectInstanceId) this.updateHoldEffect()

        this.renderSlide()
    }

    terminate() {
        if (this.shouldScheduleHoldEffect && this.holdEffectInstanceId) this.destroyHoldEffect()
    }

    get headData() {
        return archetypes.HoldStartNote.data.get(this.data.headRef)
    }

    get tailData() {
        return archetypes.HoldEndNote.data.get(this.data.tailRef)
    }

    get trackData() {
        return archetypes.Track.data.get(this.trackRef)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.trackRef)
    }

    get shouldScheduleHoldEffect() {
        return options.noteEffectEnabled && particle.effects.hold.exists
    }

    get shouldSpawnLines() {
        if (this.tail.time - this.head.time <= 0.08) return false

        let nextRef = this.trackData.moveRef
        while (nextRef) {
            const data = archetypes.TrackMoveCommand.data.get(nextRef)

            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(nextRef)
            if (sharedMemory.startTime >= this.tail.time) return false

            if (sharedMemory.endTime > this.head.time) return true

            nextRef = data.nextRef
        }

        return false
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.time - note.duration * options.hidden

        this.zs.connector = getZ(layer.connector, this.head.time)
        this.zs.slide = getZ(layer.slide, this.head.time)
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.time, time.now + hiddenDuration),
            max: Math.min(this.tail.time, time.now + note.duration),
        }

        const y = {
            min: Math.unlerp(visibleTime.min - note.duration, visibleTime.min, time.now),
            max: Math.unlerp(visibleTime.max - note.duration, visibleTime.max, time.now),
        }

        const w = (note.h * options.noteSize) / scaledScreen.wToH

        const layout = new Rect({
            l: -w,
            r: w,
            t: y.min,
            b: y.max,
        }).translate(this.trackSharedMemory.x, 0)

        skin.sprites.holdConnector.draw(layout, this.zs.connector, 1)
    }

    renderSlide() {
        skin.sprites.holdStartNote.draw(
            noteLayout().translate(this.trackSharedMemory.x, 1),
            this.zs.slide,
            1,
        )
    }

    spawnHoldEffect() {
        this.holdEffectInstanceId = particle.effects.hold.spawn(new Quad(), 0.5, true)
    }

    updateHoldEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        particle.effects.move(this.holdEffectInstanceId, layout)
    }

    destroyHoldEffect() {
        particle.effects.destroy(this.holdEffectInstanceId)
        this.holdEffectInstanceId = 0
    }
}
