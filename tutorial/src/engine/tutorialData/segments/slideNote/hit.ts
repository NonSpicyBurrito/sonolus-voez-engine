import { effect } from '../../effect.js'
import { playHitEffect } from '../../particle.js'

export const slideNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playHitEffect()
    },
}
