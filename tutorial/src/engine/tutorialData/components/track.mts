import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { scaledScreen } from '../shared.mjs'
import { skin } from '../skin.mjs'

const sprites = {
    body: skin.sprites.trackBody,
    line: skin.sprites.trackLine,
    leftBorder: skin.sprites.trackLeftBorder,
    rightBorder: skin.sprites.trackRightBorder,

    slot: skin.sprites.slot,

    fallback: skin.sprites.trackFallback,

    get useFallback() {
        return (
            !this.body.exists ||
            !this.line.exists ||
            !this.leftBorder.exists ||
            !this.rightBorder.exists
        )
    },
}

export const track = {
    update() {
        if (sprites.useFallback) {
            this.drawFallbackTrack()
        } else {
            this.drawVoezTrack()
        }

        this.drawSlot()
    },

    drawVoezTrack() {
        const l = -1
        const r = 1

        const h = scaledScreen.t - 1

        const bodyLayout = new Rect({
            l,
            r,
            t: h,
            b: 0,
        }).translate(0, 1)

        sprites.body.draw(bodyLayout, layer.trackBody, 1)

        const lineLayout = new Rect({
            l: -4 / 128,
            r: 4 / 128,
            t: h,
            b: 0,
        }).translate(0, 1)

        sprites.line.draw(lineLayout, layer.trackLine, 1)

        const leftLayout = new Rect({
            l: -33 / 128,
            r: 0,
            t: h,
            b: 0,
        }).translate(l, 1)

        sprites.leftBorder.draw(leftLayout, layer.trackBorder, 1)

        const rightLayout = new Rect({
            l: 0,
            r: 33 / 128,
            t: h,
            b: 0,
        }).translate(r, 1)

        sprites.rightBorder.draw(rightLayout, layer.trackBorder, 1)
    },

    drawFallbackTrack() {
        const layout = new Rect({
            l: -1,
            r: 1,
            t: scaledScreen.t - 1,
            b: 0,
        }).translate(0, 1)

        sprites.fallback.draw(layout, layer.trackBody, 1)
    },

    drawSlot() {
        const h = note.h
        const w = note.h / scaledScreen.wToH

        const layout = new Rect({
            l: -w,
            r: w,
            t: -h,
            b: h,
        }).translate(0, 1)

        sprites.slot.draw(layout, layer.slot, 1)
    },
}
