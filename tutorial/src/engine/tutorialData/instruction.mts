import { InstructionIconName, InstructionText } from 'sonolus-core'
import { hand } from './hand.mjs'

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

export const drawHand = (angle: number, x: number, a: number) =>
    instruction.icons.hand.paint(
        new Vec(0, 1)
            .rotate(angle)
            .mul(0.25 * ui.configuration.instruction.scale)
            .add(hand.position)
            .translate(x, 0),
        0.25 * ui.configuration.instruction.scale,
        (180 * angle) / Math.PI,
        0,
        a * ui.configuration.instruction.alpha,
    )
