import { options } from '../../../../../configuration/options.mjs'
import { buckets } from '../../../../buckets.mjs'
import { particle } from '../../../../particle.mjs'
import { skin } from '../../../../skin.mjs'
import { isUsed, markAsUsed } from '../../../InputManager.mjs'
import { note } from '../../../constants.mjs'
import { flick, scaledScreen } from '../../../shared.mjs'
import { noteLayout } from '../../../utils.mjs'
import { windows } from '../../../windows.mjs'
import { SingleNote } from '../SingleNote.mjs'
import { FlickDirection } from './FlickDirection.mjs'

export class FlickNote extends SingleNote {
    flickData = this.defineData({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    sprites = {
        note: skin.sprites.flickNote,
        fallback: {
            note: skin.sprites.flickNoteFallback,
            marker: skin.sprites.flickNoteFallbackMarker,
        },
    }

    effects = {
        hit: particle.effects.flick,
    }

    windows = windows.flickNote

    bucket = buckets.flickNote

    layout = this.entityMemory(Quad)

    activatedTouchId = this.entityMemory(TouchId)

    initialize() {
        super.initialize()

        const h = note.h * options.noteSize
        const w = h / scaledScreen.wToH

        if (this.flickData.direction === FlickDirection.Left) {
            new Quad({
                x1: w,
                x2: -w,
                x3: -w,
                x4: w,
                y1: h,
                y2: h,
                y3: -h,
                y4: -h,
            }).copyTo(this.layout)
        } else {
            new Quad({
                x1: -w,
                x2: w,
                x3: w,
                x4: -w,
                y1: -h,
                y2: -h,
                y3: h,
                y4: h,
            }).copyTo(this.layout)
        }
    }

    touch() {
        if (options.autoplay) return

        if (time.now < this.inputTime.min) return

        if (!this.activatedTouchId) this.touchActivate()

        if (this.activatedTouchId) this.touchComplete()
    }

    touchActivate() {
        for (const touch of touches) {
            if (!touch.started) continue
            if (!this.isInTrack(touch)) continue
            if (isUsed(touch)) continue

            this.activate(touch)
            return
        }
    }

    activate(touch: Touch) {
        markAsUsed(touch)

        this.activatedTouchId = touch.id
    }

    touchComplete() {
        for (const touch of touches) {
            if (touch.id !== this.activatedTouchId) continue

            const p = (touch.position.x - touch.startPosition.x) * this.flickData.direction
            const d = touch.position.sub(touch.startPosition).length

            if (p >= 0 && d >= flick.distance) {
                this.complete(touch)
            } else if (touch.ended) {
                this.despawn = true
            }
            return
        }
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    get useFallbackSprites() {
        return !this.sprites.note.exists
    }

    render() {
        super.render()

        if (this.useFallbackSprites) {
            this.sprites.fallback.note.draw(noteLayout().translate(this.x, this.y), this.z, 1)
            this.sprites.fallback.marker.draw(this.layout.translate(this.x, this.y), this.z, 1)
        } else {
            this.sprites.note.draw(this.layout.translate(this.x, this.y), this.z, 1)
        }
    }
}
