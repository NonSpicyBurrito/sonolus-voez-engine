import { options } from '../../configuration/options.mjs'
import { note } from './constants.mjs'
import { scaledScreen } from './shared.mjs'

export const setColor = (colors: number[], i: number, value: number) => {
    if (i === 0) {
        colors[0] = value
    } else if (i === 1) {
        colors[1] = value
    } else if (i === 3) {
        colors[3] = value
    } else if (i === 4) {
        colors[4] = value
    } else if (i === 5) {
        colors[5] = value
    } else if (i === 6) {
        colors[6] = value
    } else if (i === 7) {
        colors[7] = value
    } else if (i === 8) {
        colors[8] = value
    } else if (i === 9) {
        colors[9] = value
    } else {
        colors[2] = value
    }
}

export const noteLayout = () =>
    new Rect({
        l: (-note.h * options.noteSize) / scaledScreen.wToH,
        r: (note.h * options.noteSize) / scaledScreen.wToH,
        t: -note.h * options.noteSize,
        b: note.h * options.noteSize,
    })

export const effectLayout = (x: number) =>
    new Rect({
        l: -3 * options.noteEffectSize,
        r: 3 * options.noteEffectSize,
        t: -3 * options.noteEffectSize * scaledScreen.wToH,
        b: 3 * options.noteEffectSize * scaledScreen.wToH,
    }).translate(x, 1)

export const getZ = (layer: number, time: number) => layer - time / 1000

export const getScheduleSFXTime = (targetTime: number) =>
    targetTime - 0.5 - Math.max(audio.offset, 0)
