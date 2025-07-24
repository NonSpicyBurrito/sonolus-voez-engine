import { windows } from '../../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../../buckets.js'
import { skin } from '../../../skin.js'
import { TapNote } from './TapNote.js'

export class HoldStartNote extends TapNote {
    sprites = {
        note: skin.sprites.holdStartNote,
    }

    windows = windows.holdStartNote

    bucket = buckets.holdStartNote

    sharedMemory = this.defineSharedMemory({
        judgment: DataType<Judgment>,
    })

    render(y: number) {
        if (time.now >= this.targetTime) return

        super.render(y)
    }

    complete(touch: Touch) {
        super.complete(touch)

        this.sharedMemory.judgment = this.result.judgment
    }
}
