import { FlickDirection } from '../../../../../../../shared/src/engine/data/FlickDirection.mjs'
import { leftRotated, rightRotated } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../configuration/options.mjs'
import { buckets } from '../../../buckets.mjs'
import { flick } from '../../../flick.mjs'
import { note, noteLayout } from '../../../note.mjs'
import { particle } from '../../../particle.mjs'
import { scaledScreen } from '../../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../../skin.mjs'
import { windows } from '../../../windows.mjs'
import { isUsed, markAsUsed } from '../../InputManager.mjs'
import { SingleNote } from './SingleNote.mjs'

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
    markerZ = this.entityMemory(Number)

    activatedTouchId = this.entityMemory(TouchId)

    initialize() {
        super.initialize()

        const h = note.h * options.noteSize
        const w = h / scaledScreen.wToH

        if (this.useFallbackSprites) {
            if (this.flickData.direction === FlickDirection.Left) {
                leftRotated({ l: -2 * w, r: 0, t: -h, b: h }).copyTo(this.layout)
            } else {
                rightRotated({ l: 0, r: 2 * w, t: -h, b: h }).copyTo(this.layout)
            }

            this.markerZ = getZ(layer.note.marker, this.targetTime)
        } else {
            if (this.flickData.direction === FlickDirection.Left) {
                leftRotated({ l: -w, r: w, t: -h, b: h }).copyTo(this.layout)
            } else {
                rightRotated({ l: -w, r: w, t: -h, b: h }).copyTo(this.layout)
            }
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
            this.sprites.fallback.marker.draw(
                this.layout.translate(this.x, this.y),
                this.markerZ,
                1,
            )
        } else {
            this.sprites.note.draw(this.layout.translate(this.x, this.y), this.z, 1)
        }
    }
}
