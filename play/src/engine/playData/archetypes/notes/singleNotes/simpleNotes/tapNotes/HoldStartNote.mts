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

    render() {
        if (time.now >= this.targetTime) return

        super.render()
    }
}
