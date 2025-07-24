import { effect } from '../../effect.js'
import { playFlickEffect } from '../../particle.js'

export const flickNoteHit = {
    enter() {
        effect.clips.perfect.play(0)

        playFlickEffect()
    },
}
