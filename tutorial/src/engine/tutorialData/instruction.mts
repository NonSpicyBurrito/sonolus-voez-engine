import { InstructionIconName, InstructionText } from 'sonolus-core'

export const instruction = defineInstruction({
    texts: {
        tap: InstructionText.Tap,
        tapAndFlick: InstructionText.TapAndFlick,
        tapAndHold: InstructionText.TapAndHold,
        hold: InstructionText.Hold,
    },

    icons: {
        hand: InstructionIconName.Hand,
    },
})
