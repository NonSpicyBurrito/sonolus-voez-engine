import { options } from '../../../../configuration/options.mjs'
import { effect, getScheduleSFXTime, sfxDistance } from '../../../effect.mjs'
import { effectLayout } from '../../../particle.mjs'
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

        this.result.accuracy = this.windows.good.max
    }

    scheduleSFX() {
        super.scheduleSFX()

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

        this.effects.hit.spawn(layout, 0.5, false)
    }
}
