import { flickDisplay } from '../../components/flickDisplay.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const flickNoteFrozen = {
    enter() {
        flickDisplay.showFrozen()

        instruction.texts.tapAndFlick.show()
    },

    update() {
        drawHand(
            Math.remapClamped(0.25, 0.5, Math.PI / 6, Math.PI / 3, segment.time % 1),
            Math.remapClamped(0.5, 0.75, 0, 0.5, segment.time % 1),
            Math.unlerpClamped(0.5, 0.25, Math.abs((segment.time % 1) - 0.5)),
        )
    },

    exit() {
        flickDisplay.clear()

        instruction.texts.clear()
    },
}
