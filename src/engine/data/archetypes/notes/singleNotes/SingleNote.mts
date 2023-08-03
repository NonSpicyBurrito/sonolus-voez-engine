import { options } from '../../../../configuration/options.mjs'
import { effect } from '../../../effect.mjs'
import { minSFXDistance } from '../../constants.mjs'
import { effectLayout, getScheduleSFXTime } from '../../utils.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    abstract effects: {
        hit: ParticleEffect
    }

    preprocess() {
        super.preprocess()

        this.scheduleSFXTime = getScheduleSFXTime(this.targetTime)

        this.spawnTime = Math.min(this.visualTime.min, this.scheduleSFXTime)
    }

    initialize() {
        super.initialize()

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect

            this.result.bucket.index = this.bucket.index
        } else {
            this.result.accuracy = this.windows.good.max
        }
    }

    terminate() {
        if (!options.autoplay) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    scheduleSFX() {
        super.scheduleSFX()

        effect.clips.perfect.schedule(this.targetTime, minSFXDistance)
    }

    playSFX() {
        if (this.result.judgment === Judgment.Perfect) {
            effect.clips.perfect.play(minSFXDistance)
        } else if (this.result.judgment === Judgment.Great) {
            effect.clips.great.play(minSFXDistance)
        } else if (this.result.judgment === Judgment.Good) {
            effect.clips.good.play(minSFXDistance)
        }
    }

    playHitEffects() {
        if (this.shouldPlaySFX) this.playSFX()
        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        this.effects.hit.spawn(layout, 0.5, false)
    }
}