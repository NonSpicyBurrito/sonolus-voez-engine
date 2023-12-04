import { options } from '../../../../configuration/options.mjs'
import { effect, sfxDistance } from '../../../effect.mjs'
import { effectLayout } from '../../../particle.mjs'
import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    abstract effect: ParticleEffect

    preprocess() {
        super.preprocess()

        if (options.sfxEnabled) this.scheduleSFX()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    scheduleSFX() {
        effect.clips.perfect.schedule(this.targetTime, sfxDistance)
    }

    despawnTerminate() {
        if (options.noteEffectEnabled) this.playNoteEffect()
    }

    playNoteEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        this.effect.spawn(layout, 0.5, false)
    }
}
