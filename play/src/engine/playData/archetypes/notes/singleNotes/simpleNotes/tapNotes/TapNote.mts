import { buckets } from '../../../../../buckets.mjs'
import { skin } from '../../../../../skin.mjs'
import { windows } from '../../../../../windows.mjs'
import { isUsed, markAsUsed } from '../../../../InputManager.mjs'
import { SimpleNote } from '../SimpleNote.mjs'

export class TapNote extends SimpleNote {
    sprites = {
        note: skin.sprites.tapNote,
    }

    windows = windows.tapNote

    bucket = buckets.tapNote

    touch() {
        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.isInTrack(touch)) continue
            if (isUsed(touch)) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        markAsUsed(touch)

        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
