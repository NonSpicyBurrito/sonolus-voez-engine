import { effect } from '../../effect.mjs'
import { playNoteEffect } from '../../utils.mjs'

export const slideNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playNoteEffect()
    },
}