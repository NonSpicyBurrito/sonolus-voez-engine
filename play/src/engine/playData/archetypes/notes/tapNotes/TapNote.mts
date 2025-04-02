import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { isUsed, markAsUsed } from '../../InputManager.mjs'
import { Note } from '../Note.mjs'

export class TapNote extends Note {
    sprites = {
        note: skin.sprites.tapNote,
    }

    effects = {
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.hitFallback,
    }

    windows = windows.tapNote

    bucket: Bucket = buckets.tapNote

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
