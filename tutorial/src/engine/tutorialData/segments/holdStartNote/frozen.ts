import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'
import { drawHand, instruction } from '../../instruction.js'
import { segment } from '../../segment.js'

export const holdStartNoteFrozen = {
    enter() {
        connector.showFrozen()
        noteDisplay.showFrozen('holdStart')

        instruction.texts.tapAndHold.show()
    },

    update() {
        drawHand(
            Math.remapClamped(0.25, 0.75, Math.PI / 6, Math.PI / 3, segment.time % 1),
            0,
            Math.unlerpClamped(0, 0.25, segment.time % 1),
        )
    },

    exit() {
        connector.clear()
        noteDisplay.clear()

        instruction.texts.clear()
    },
}
