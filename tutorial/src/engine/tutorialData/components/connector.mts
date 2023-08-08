import { note } from '../../../../../shared/src/engine/data/note.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    connector: skin.sprites.holdConnector,
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)

export const connector = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -2
            const r = 2

            const t = 0.5 - 6 * scaledScreen.wToH
            const b = 0.5

            const layout = new Rect({ l, r, t, b })

            sprites.connector.draw(layout, layer.connector, a)
        } else {
            const w = note.h / scaledScreen.wToH

            const t = 0
            const b = Math.unlerp(0, 2, mode === 2 ? segment.time : 2)

            const layout = new Rect({ l: -w, r: w, b, t })

            sprites.connector.draw(layout, layer.connector, 1)
        }
    },

    showOverlay() {
        mode = 1
    },

    showFall() {
        mode = 2
    },

    showFrozen() {
        mode = 3
    },

    clear() {
        mode = 0
    },
}
