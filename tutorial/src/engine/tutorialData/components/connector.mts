import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { scaledScreen, segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach } from '../utils.mjs'

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
            const b = approach(mode === 2 ? segment.time : 2)

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
