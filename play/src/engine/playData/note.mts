import { options } from '../configuration/options.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const note = {
    h: 0.05,
}

export const noteLayout = () =>
    new Rect({
        l: (-note.h * options.noteSize) / scaledScreen.wToH,
        r: (note.h * options.noteSize) / scaledScreen.wToH,
        t: -note.h * options.noteSize,
        b: note.h * options.noteSize,
    })
