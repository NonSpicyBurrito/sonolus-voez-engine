import { effect } from '../../effect.mjs'
import { playNoteEffect } from '../../particle.mjs'

export const slideNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playNoteEffect()
    },
}
