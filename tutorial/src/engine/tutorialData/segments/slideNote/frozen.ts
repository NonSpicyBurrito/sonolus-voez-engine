import { noteDisplay } from '../../components/noteDisplay.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const slideNoteFrozen = {
    enter() {
        noteDisplay.showFrozen('slide')

        instruction.texts.hold.show()
    },

    update() {
        drawHand(Math.PI / 3, 0, Math.unlerpClamped(1, 0.75, segment.time % 1))
    },

    exit() {
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
