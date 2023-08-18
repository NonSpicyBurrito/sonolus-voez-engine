import { effect } from '../../effect.mjs'
import { playNoteEffect } from '../../particle.mjs'

export const tapNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playNoteEffect()
    },
}
