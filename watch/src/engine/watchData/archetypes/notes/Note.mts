import { EngineArchetypeDataName } from '@sonolus/core'
import { toBucketWindows, Windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { options } from '../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../effect.mjs'
import { note, noteLayout } from '../../note.mjs'
import { effectLayout } from '../../particle.mjs'
import { getZ, layer } from '../../skin.mjs'
import { archetypes } from '../index.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    import = this.defineImport({
        trackRef: { name: 'trackRef', type: Number },
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        despawnTime: Number,
    })

    abstract sprites: {
        note: SkinSprite
    }

    abstract effects: {
        perfect: ParticleEffect
        great: ParticleEffect
        good: ParticleEffect
        fallback: ParticleEffect
        duration: number
    }

    abstract windows: Windows

    abstract bucket: Bucket

    initialized = this.entityMemory(Boolean)

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    z = this.entityMemory(Number)

    globalPreprocess() {
        this.bucket.set(toBucketWindows(this.windows))

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.sharedMemory.despawnTime = this.hitTime

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }

        this.result.time = this.targetTime

        if (!replay.isReplay) {
            this.result.bucket.index = this.bucket.index
        } else if (this.import.judgment) {
            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.import.accuracy * 1000
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.sharedMemory.despawnTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        this.render(y)
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    get hitTime() {
        return (
            this.targetTime +
            (replay.isReplay ? this.import.accuracy + this.import.accuracyDiff : 0)
        )
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.import.trackRef)
    }

    get x() {
        return this.trackSharedMemory.x
    }

    get useFallbackEffects() {
        return (
            !this.effects.perfect.exists || !this.effects.great.exists || !this.effects.good.exists
        )
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.hitTime, sfxDistance)
    }

    scheduleReplaySFX() {
        if (!this.import.judgment) return

        switch (this.import.judgment) {
            case Judgment.Perfect:
                effect.clips.perfect.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Great:
                effect.clips.great.schedule(this.hitTime, sfxDistance)
                break
            case Judgment.Good:
                effect.clips.good.schedule(this.hitTime, sfxDistance)
                break
        }
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        this.z = getZ(layer.note.body, this.targetTime)
    }

    render(y: number) {
        this.sprites.note.draw(noteLayout().translate(this.x, y), this.z, 1)
    }

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        if (this.useFallbackEffects) {
            this.effects.fallback.spawn(layout, this.effects.duration, false)
        } else {
            switch (replay.isReplay ? this.import.judgment : Judgment.Perfect) {
                case Judgment.Perfect:
                    this.effects.perfect.spawn(layout, this.effects.duration, false)
                    break
                case Judgment.Great:
                    this.effects.great.spawn(layout, this.effects.duration, false)
                    break
                case Judgment.Good:
                    this.effects.good.spawn(layout, this.effects.duration, false)
                    break
            }
        }
    }
}
