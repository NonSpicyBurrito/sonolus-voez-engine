import { note } from '../../../../shared/src/engine/data/note.js'
import { scaledScreen } from './scaledScreen.js'

export const noteLayout = () =>
    new Rect({
        l: -note.h / scaledScreen.wToH,
        r: note.h / scaledScreen.wToH,
        t: -note.h,
        b: note.h,
    })
