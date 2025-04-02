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
    })

    export = this.defineExport({
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    abstract sprites: {
        note: SkinSprite
    }

    abstract effects: {
        perfect: ParticleEffect
        great: ParticleEffect
        good: ParticleEffect
        fallback: ParticleEffect
    }

    abstract windows: Windows

    abstract bucket: Bucket

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    inputTime = this.entityMemory(Range)

    z = this.entityMemory(Number)

    globalPreprocess() {
        this.bucket.set(toBucketWindows(this.windows))

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.inputTime.copyFrom(this.windows.good.add(this.targetTime).add(input.offset))

        this.spawnTime = Math.min(this.visualTime.min, this.inputTime.min)

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        this.z = getZ(layer.note.body, this.targetTime)

        this.result.accuracy = this.windows.good.max
    }

    touchOrder = 1

    updateParallel() {
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        this.render(y)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.import.trackRef)
    }

    get x() {
        return this.trackSharedMemory.x
    }

    get hitbox() {
        return this.trackSharedMemory.hitbox
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoSFX
    }

    get useFallbackEffects() {
        return (
            !this.effects.perfect.exists || !this.effects.great.exists || !this.effects.good.exists
        )
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    playSFX() {
        switch (this.result.judgment) {
            case Judgment.Perfect:
                effect.clips.perfect.play(sfxDistance)
                break
            case Judgment.Great:
                effect.clips.great.play(sfxDistance)
                break
            case Judgment.Good:
                effect.clips.good.play(sfxDistance)
                break
        }
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        if (this.useFallbackEffects) {
            this.effects.fallback.spawn(layout, 0.5, false)
        } else {
            switch (this.result.judgment) {
                case Judgment.Perfect:
                    this.effects.perfect.spawn(layout, 0.5, false)
                    break
                case Judgment.Great:
                    this.effects.great.spawn(layout, 0.5, false)
                    break
                case Judgment.Good:
                    this.effects.good.spawn(layout, 0.5, false)
                    break
            }
        }
    }

    isInTrack(touch: Touch) {
        return touch.x >= this.hitbox.l && touch.x <= this.hitbox.r
    }

    render(y: number) {
        this.sprites.note.draw(noteLayout().translate(this.x, y), this.z, 1)
    }

    incomplete(hitTime: number) {
        this.export('accuracyDiff', hitTime - this.result.accuracy - this.targetTime)

        this.despawn = true
    }
}
