import { options } from '../../configuration/options.mjs'
import { note } from './constants.mjs'
import { scaledScreen } from './shared.mjs'

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
