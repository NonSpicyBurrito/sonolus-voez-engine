import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class SlideNote extends Note {
    sprites = {
        note: skin.sprites.slideNote,
    }

    effects = {
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.hitFallback,
        duration: 0.5,
    }

    windows = windows.slideNote

    bucket = buckets.slideNote

    touch() {
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
