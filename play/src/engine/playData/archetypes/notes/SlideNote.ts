import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { Note } from './Note.js'

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

    hasEarlyHit = this.entityMemory(Boolean)
    earlyHitTime = this.entityMemory(Number)

    touch() {
        if (time.now < this.inputTime.min) return

        const hitTime = time.now - input.offset
        if (hitTime < this.targetTime) {
            let isHolding = false

            for (const touch of touches) {
                if (!this.isInTrack(touch)) continue
                isHolding ||= !touch.ended

                this.hasEarlyHit = true
                this.earlyHitTime = hitTime
            }

            if (this.hasEarlyHit && !isHolding) {
                this.complete(this.earlyHitTime)
            }
        } else {
            for (const touch of touches) {
                if (!this.isInTrack(touch)) continue

                this.complete(Math.max(touch.t, this.targetTime))
                return
            }

            if (this.hasEarlyHit) {
                this.complete(this.earlyHitTime)
            }
        }
    }

    complete(hitTime: number) {
        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }
}
