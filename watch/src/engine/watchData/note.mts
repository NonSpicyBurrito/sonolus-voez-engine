import { note as _note } from '../../../../shared/src/engine/data/note.mjs'
import { options } from '../configuration/options.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const note = {
    ..._note,

    get duration() {
        return Math.remap(1, 10, 1.5, 0.15, options.noteSpeed)
    },
}

export const noteLayout = () =>
    new Rect({
        l: (-note.h * options.noteSize) / scaledScreen.wToH,
        r: (note.h * options.noteSize) / scaledScreen.wToH,
        t: -note.h * options.noteSize,
        b: note.h * options.noteSize,
    })
