import { note } from '../../../../../shared/src/engine/data/note.js'
import { scaledScreen } from '../scaledScreen.js'
import { layer, skin } from '../skin.js'

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
