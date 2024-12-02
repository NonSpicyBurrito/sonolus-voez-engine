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

    trackRef = this.entityMemory(Number)

    head = this.entityMemory({
        time: Number,
    })

    tail = this.entityMemory({
        time: Number,
    })

    spawnTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    zs = this.entityMemory({
        connector: Number,
        slide: Number,
    })

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)

    effectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    nextLineTime = this.entityMemory(Number)

    preprocess() {
        this.head.time = bpmChanges.at(this.headImport.beat).time
        this.tail.time = bpmChanges.at(this.tailImport.beat).time

        this.visualTime.min = this.head.time - note.duration

        this.spawnTime = this.visualTime.min

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.trackRef = this.headImport.trackRef

        this.visualTime.max = this.tail.time

        if (options.hidden > 0) this.hiddenTime = this.tail.time - note.duration * options.hidden

        this.zs.connector = getZ(layer.connector, this.head.time)
        this.zs.slide = getZ(layer.slide, this.head.time)

        this.nextLineTime = 999999
        if (this.tail.time - this.head.time <= 0.08) return

        let nextRef = this.trackImport.moveRef
        while (nextRef) {
            const commandImport = archetypes.TrackMoveCommand.import.get(nextRef)

            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(nextRef)
            if (sharedMemory.startTime >= this.tail.time) break

            if (sharedMemory.endTime > this.head.time) {
                this.nextLineTime = this.head.time + 0.08
                break
            }

            nextRef = commandImport.nextRef
        }
    }

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

        if (this.shouldPlaySFX && !this.sfxInstanceId && this.isActive) this.playSFX()

        if (this.shouldSpawnHoldEffect && this.isActive) {
            if (!this.effectInstanceId) this.spawnHoldEffect()

            this.moveHoldEffect()
        }

        this.spawnLine()

        if (time.now < this.visualTime.min || time.now >= this.visualTime.max) return

        this.renderConnector()

        if (time.now < this.head.time) return

        this.renderSlide()
    }

    terminate() {
        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (this.shouldSpawnHoldEffect && this.effectInstanceId) this.destroyHoldEffect()
    }

    get headInfo() {
        return entityInfos.get(this.import.headRef)
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.import.headRef)
    }

    get headSharedMemory() {
        return archetypes.HoldStartNote.sharedMemory.get(this.import.headRef)
    }

    get tailInfo() {
        return entityInfos.get(this.import.tailRef)
    }

    get trackImport() {
        return archetypes.Track.import.get(this.trackRef)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.trackRef)
    }

    get tailImport() {
        return archetypes.HoldEndNote.import.get(this.import.tailRef)
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && effect.clips.hold.exists && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && effect.clips.hold.exists && !options.autoSFX
    }

    get shouldSpawnHoldEffect() {
        return options.noteEffectEnabled && particle.effects.hold.exists
    }

    get isActive() {
        return this.headInfo.state === EntityState.Despawned && this.headSharedMemory.activated
    }

    get isDead() {
        return this.tailInfo.state === EntityState.Despawned
    }

    scheduleSFX() {
        const id = effect.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)
    }

    playSFX() {
        this.sfxInstanceId = effect.clips.hold.loop()
    }

    stopSFX() {
        effect.clips.stopLoop(this.sfxInstanceId)
    }

    spawnHoldEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        this.effectInstanceId = particle.effects.hold.spawn(layout, 0.5, true)
    }

    moveHoldEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        particle.effects.move(this.effectInstanceId, layout)
    }

    destroyHoldEffect() {
        particle.effects.destroy(this.effectInstanceId)
    }

    spawnLine() {
        if (time.now < this.nextLineTime - note.duration) return

        archetypes.HoldLine.spawn({
            time: this.nextLineTime,
            tailRef: this.import.tailRef,
            trackRef: this.trackRef,
        })

        if ((this.nextLineTime += 0.08) >= this.tail.time) {
            this.nextLineTime = 999999
        }
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
}
