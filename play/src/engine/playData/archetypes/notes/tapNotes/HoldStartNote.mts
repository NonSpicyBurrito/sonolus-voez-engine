import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { skin } from '../../../skin.mjs'
import { TapNote } from './TapNote.mjs'

export class HoldStartNote extends TapNote {
    sprites = {
        note: skin.sprites.holdStartNote,
    }

    windows = windows.holdStartNote

    bucket = buckets.holdStartNote

    sharedMemory = this.defineSharedMemory({
        activated: Boolean,
    })

    render(y: number) {
        if (time.now >= this.targetTime) return

        super.render(y)
    }

    complete(touch: Touch) {
        super.complete(touch)

        this.sharedMemory.activated = true
    }
}
