import { layer } from '../layer.mjs'
import { scaledScreen } from '../shared.mjs'
import { skin } from '../skin.mjs'

const sprites = {
    body: skin.sprites.trackGlowBody,
    leftBorder: skin.sprites.trackGlowLeftBorder,
    rightBorder: skin.sprites.trackGlowRightBorder,
}

let mode = tutorialMemory(Boolean)

export const trackGlow = {
    update() {
        if (!sprites.body.exists || !sprites.leftBorder.exists || !sprites.rightBorder.exists)
            return

        if (!mode) return

        const l = -1
        const r = 1

        const h = scaledScreen.t - 1

        const b = (-27 / 128) * h
        const t = b + h

        const bodyLayout = new Rect({
            l,
            r,
            t,
            b,
        }).translate(0, 1)

        sprites.body.draw(bodyLayout, layer.trackGlow, 1)

        const leftLayout = new Rect({
            l: -52 / 128,
            r: 0,
            t,
            b,
        }).translate(l, 1)

        sprites.leftBorder.draw(leftLayout, layer.trackGlow, 1)

        const rightLayout = new Rect({
            l: 0,
            r: 52 / 128,
            t,
            b,
        }).translate(r, 1)

        sprites.rightBorder.draw(rightLayout, layer.trackGlow, 1)
    },

    show() {
        mode = true
    },

    clear() {
        mode = false
    },
}
