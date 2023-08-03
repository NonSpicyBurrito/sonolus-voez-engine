import { layer } from '../layer.mjs'
import { scaledScreen, segment } from '../shared.mjs'
import { skin } from '../skin.mjs'
import { approach, noteLayout } from '../utils.mjs'

const sprites = {
    tap: skin.sprites.tapNote,
    slide: skin.sprites.slideNote,
    holdStart: skin.sprites.holdStartNote,
}

let mode = tutorialMemory(DataType<0 | 1 | 2 | 3>)

let id = tutorialMemory(SkinSpriteId)

export const noteDisplay = {
    update() {
        if (!mode) return

        if (mode === 1) {
            const a = Math.unlerpClamped(1, 0.75, segment.time)

            const l = -2
            const r = 2

            const t = 0.5 - 2 * scaledScreen.wToH
            const b = 0.5 + 2 * scaledScreen.wToH

            skin.sprites.draw(id, new Rect({ l, r, t, b }), layer.note, a)
        } else {
            const y = mode === 2 ? approach(segment.time) : 1

            skin.sprites.draw(id, noteLayout().translate(0, y), layer.note, 1)
        }
    },

    showOverlay(type: keyof typeof sprites) {
        mode = 1
        this.setType(type)
    },

    showFall(type: keyof typeof sprites) {
        mode = 2
        this.setType(type)
    },

    showFrozen(type: keyof typeof sprites) {
        mode = 3
        this.setType(type)
    },

    clear() {
        mode = 0
    },

    setType(type: keyof typeof sprites) {
        for (const [key, sprite] of Object.entries(sprites)) {
            if (key !== type) continue

            id = sprite.id
        }
    },
}
