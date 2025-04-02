import { effect } from '../../effect.mjs'
import { playFlickEffect } from '../../particle.mjs'

export const flickNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playFlickEffect()
    },
}
