import { options } from '../../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../../effect.mjs'
import { effectLayout } from '../../../particle.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    abstract effect: ParticleEffect

    preprocess() {
        super.preprocess()

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySFX()
            } else {
                this.scheduleSFX()
            }
        }
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
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

    despawnTerminate() {
        if (replay.isReplay && !this.import.judgment) return

        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        this.effect.spawn(layout, 0.5, false)
    }
}
