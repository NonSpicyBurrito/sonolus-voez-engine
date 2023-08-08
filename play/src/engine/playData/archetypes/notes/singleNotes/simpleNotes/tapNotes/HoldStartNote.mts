import { buckets } from '../../../../../buckets.mjs'
import { skin } from '../../../../../skin.mjs'
import { windows } from '../../../../../windows.mjs'
import { TapNote } from './TapNote.mjs'

export class HoldStartNote extends TapNote {
    sprites = {
        note: skin.sprites.holdStartNote,
    }

    windows = windows.holdStartNote

    bucket = buckets.holdStartNote

    get shouldRender() {
        return time.now < this.targetTime
    }
}
