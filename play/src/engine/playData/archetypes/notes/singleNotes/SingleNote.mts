import { options } from '../../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../../effect.mjs'
import { effectLayout } from '../../../particle.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    abstract effects: {
        hit: ParticleEffect
    }

    preprocess() {
        super.preprocess()

        this.spawnTime = Math.min(this.visualTime.min, this.inputTime.min)

        if (this.shouldScheduleSFX) this.scheduleSFX()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && options.autoSFX
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoSFX
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

        this.effects.hit.spawn(layout, 0.5, false)
    }
}
