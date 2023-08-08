import { options } from '../../../../../configuration/options.mjs'
import { buckets } from '../../../../buckets.mjs'
import { skin } from '../../../../skin.mjs'
import { windows } from '../../../../windows.mjs'
import { SimpleNote } from './SimpleNote.mjs'

export class SlideNote extends SimpleNote {
    sprites = {
        note: skin.sprites.slideNote,
    }

    windows = windows.slideNote

    bucket = buckets.slideNote

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        for (const touch of touches) {
            if (!this.isInTrack(touch)) continue

            this.complete(touch)
            return
        }
    }

    complete(touch: Touch) {
        const hitTime = Math.max(touch.time, this.targetTime)

        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
