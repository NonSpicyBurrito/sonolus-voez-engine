import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { scaledScreen } from '../shared.mjs'
import { skin } from '../skin.mjs'

const sprites = {
    judgmentLine: skin.sprites.judgmentLine,
}

export const stage = {
    update() {
        const layout = new Rect({
            l: scaledScreen.l,
            r: scaledScreen.r,
            t: -note.h,
            b: note.h,
        }).translate(0, 1)

        sprites.judgmentLine.draw(layout, layer.judgmentLine, 1)
    },
}
