import { rightRotated } from '../../../../../shared/src/engine/data/utils.mjs'
import { noteLayout } from '../note.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { segment } from '../segment.mjs'
import { layer, skin } from '../skin.mjs'

const sprites = {
    note: skin.sprites.flickNote,

    fallback: {
        note: skin.sprites.flickNoteFallback,
        marker: skin.sprites.flickNoteFallbackMarker,
    },

    get useFallback() {
        return !this.note.exists
    },
}

enum Mode {
    None,
    Overlay,
    Fall,
    Frozen,
}

let mode = tutorialMemory(DataType<Mode>)

export const flickDisplay = {
    update() {
        if (!mode) return

        if (mode === Mode.Overlay) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -2
            const r = 2

            const t = 0.5 - 2 * scaledScreen.wToH
            const b = 0.5 + 2 * scaledScreen.wToH

            const layout = new Rect({ l, r, t, b })

            if (sprites.useFallback) {
                sprites.fallback.note.draw(layout, layer.note.body, a)
                sprites.fallback.marker.draw(rightRotated(layout), layer.note.marker, a)
            } else {
                sprites.note.draw(rightRotated(layout), layer.note.marker, a)
            }
        } else {
            const y = mode === Mode.Fall ? Math.unlerp(0, 2, segment.time) : 1

            const layout = noteLayout()

            if (sprites.useFallback) {
                sprites.fallback.note.draw(layout.translate(0, y), layer.note.body, 1)
                sprites.fallback.marker.draw(
                    rightRotated(layout).translate(0, y),
                    layer.note.marker,
                    1,
                )
            } else {
                sprites.note.draw(rightRotated(layout).translate(0, y), layer.note.marker, 1)
            }
        }
    },

    showOverlay() {
        mode = Mode.Overlay
    },

    showFall() {
        mode = Mode.Fall
    },

    showFrozen() {
        mode = Mode.Frozen
    },

    clear() {
        mode = Mode.None
    },
}
