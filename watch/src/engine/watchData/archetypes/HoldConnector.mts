import { options } from '../../configuration/options.mjs'
import { effect } from '../effect.mjs'
import { note, noteLayout } from '../note.mjs'
import { effectLayout, particle } from '../particle.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    import = this.defineImport({
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

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    holdEffectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    zs = this.entityMemory({
        connector: Number,
        slide: Number,
    })

    preprocessOrder = 1
    preprocess() {
        this.trackRef = this.headImport.trackRef

        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.tail.time = bpmChanges.at(this.tailImport.beat).time

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
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime(): number {
        return replay.isReplay
            ? Math.min(this.tailSharedMemory.despawnTime, this.tail.time)
            : this.tail.time
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

        this.renderSlide()

        if (!this.shouldScheduleHoldEffect || !this.isActive) return

        if (!this.holdEffectInstanceId) this.spawnHoldEffect()

        if (this.holdEffectInstanceId) this.updateHoldEffect()
    }

    terminate() {
        if (this.shouldScheduleHoldEffect && this.holdEffectInstanceId) this.destroyHoldEffect()
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.import.headRef)
    }

    get headSharedMemory() {
        return archetypes.HoldEndNote.sharedMemory.get(this.import.headRef)
    }

    get tailImport() {
        return archetypes.HoldEndNote.import.get(this.import.tailRef)
    }

    get tailSharedMemory() {
        return archetypes.HoldEndNote.sharedMemory.get(this.import.tailRef)
    }

    get trackImport() {
        return archetypes.Track.import.get(this.trackRef)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.trackRef)
    }

    get shouldScheduleHoldEffect() {
        return (
            options.noteEffectEnabled &&
            (!this.useFallbackEffects || particle.effects.holdFallback.exists)
        )
    }

    get useFallbackEffects() {
        return (
            !particle.effects.holdPerfect.exists ||
            !particle.effects.holdGreat.exists ||
            !particle.effects.holdGood.exists
        )
    }

    get isActive() {
        return (
            (!replay.isReplay || this.headImport.judgment) &&
            time.now >= this.headSharedMemory.despawnTime
        )
    }

    get shouldSpawnLines() {
        if (this.tail.time - this.head.time <= 0.08) return false

        let nextRef = this.trackImport.moveRef
        while (nextRef) {
            const commandImport = archetypes.TrackMoveCommand.import.get(nextRef)

            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(nextRef)
            if (sharedMemory.startTime >= this.tail.time) return false

            if (sharedMemory.endTime > this.head.time) return true

            nextRef = commandImport.nextRef
        }

        return false
    }

    globalInitialize() {
        if (options.hidden > 0) this.hiddenTime = this.tail.time - note.duration * options.hidden

        this.zs.connector = getZ(layer.connector, this.head.time)
        this.zs.slide = getZ(layer.slide, this.head.time)
    }

    scheduleSFX() {
        const id = effect.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)
    }

    scheduleReplaySFX() {
        if (!this.headImport.judgment) return

        const start = Math.max(this.head.time, this.headSharedMemory.despawnTime)
        const end = Math.min(this.tail.time, this.tailSharedMemory.despawnTime)
        if (start >= end) return

        const id = effect.clips.hold.scheduleLoop(start)
        effect.clips.scheduleStopLoop(id, end)
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

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
        const layout = new Quad()

        if (this.useFallbackEffects) {
            this.holdEffectInstanceId = particle.effects.holdFallback.spawn(layout, 1, true)
        } else {
            switch (replay.isReplay ? this.headImport.judgment : Judgment.Perfect) {
                case Judgment.Perfect:
                    this.holdEffectInstanceId = particle.effects.holdPerfect.spawn(layout, 1, true)
                    break
                case Judgment.Great:
                    this.holdEffectInstanceId = particle.effects.holdGreat.spawn(layout, 1, true)
                    break
                case Judgment.Good:
                    this.holdEffectInstanceId = particle.effects.holdGood.spawn(layout, 1, true)
                    break
            }
        }
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
