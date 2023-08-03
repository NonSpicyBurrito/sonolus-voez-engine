import { note } from './constants.mjs'
import { instruction } from './instruction.mjs'
import { particle } from './particle.mjs'
import { hand, scaledScreen } from './shared.mjs'

export const noteLayout = () =>
    new Rect({
        l: -note.h / scaledScreen.wToH,
        r: note.h / scaledScreen.wToH,
        t: -note.h,
        b: note.h,
    })

export const rightRotated = ({ l, r, b, t }: RectLike) =>
    new Quad({
        x1: l,
        x2: r,
        x3: r,
        x4: l,
        y1: t,
        y2: t,
        y3: b,
        y4: b,
    })

const effectLayout = () =>
    new Rect({
        l: -3,
        r: 3,
        t: -3 * scaledScreen.wToH,
        b: 3 * scaledScreen.wToH,
    }).translate(0, 1)

export const playNoteEffect = () => particle.effects.hit.spawn(effectLayout(), 0.5, false)

export const spawnHoldEffect = () => particle.effects.hold.spawn(effectLayout(), 0.5, true)

export const approach = (now: number) => Math.unlerp(0, 2, now)

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
