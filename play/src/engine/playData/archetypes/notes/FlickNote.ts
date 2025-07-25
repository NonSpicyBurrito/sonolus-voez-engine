import { FlickDirection } from '../../../../../../shared/src/engine/data/FlickDirection.js'
import { leftRotated, rightRotated } from '../../../../../../shared/src/engine/data/utils.js'
import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { flick } from '../../flick.js'
import { note, noteLayout } from '../../note.js'
import { particle } from '../../particle.js'
import { scaledScreen } from '../../scaledScreen.js'
import { getZ, layer, skin } from '../../skin.js'
import { isUsed, markAsUsed } from '../InputManager.js'
import { Note } from './Note.js'

export class FlickNote extends Note {
    flickImport = this.defineImport({
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
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.flickFallback,
        duration: 0.5,
    }

    windows = windows.flickNote

    bucket = buckets.flickNote

    layout = this.entityMemory(Quad)
    markerZ = this.entityMemory(Number)

    activatedTouchId = this.entityMemory(TouchId)

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickImport.direction *= -1
    }

    initialize() {
        super.initialize()

        const h = note.h * options.noteSize
        const w = h / scaledScreen.wToH

        if (this.useFallbackSprites) {
            if (this.flickImport.direction === FlickDirection.Left) {
                leftRotated({ l: -2 * w, r: 0, t: -h, b: h }).copyTo(this.layout)
            } else {
                rightRotated({ l: 0, r: 2 * w, t: -h, b: h }).copyTo(this.layout)
            }

            this.markerZ = getZ(layer.note.marker, this.targetTime)
        } else {
            if (this.flickImport.direction === FlickDirection.Left) {
                leftRotated({ l: -w, r: w, t: -h, b: h }).copyTo(this.layout)
            } else {
                rightRotated({ l: -w, r: w, t: -h, b: h }).copyTo(this.layout)
            }
        }
    }

    touch() {
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

            const p = (touch.position.x - touch.startPosition.x) * this.flickImport.direction
            const d = touch.position.sub(touch.startPosition).length

            if (p >= 0 && d >= flick.distance) {
                this.complete(touch)
            } else if (touch.ended) {
                this.incomplete(touch.t)
            }
            return
        }
    }

    complete(touch: Touch) {
        this.result.judgment = input.judge(touch.startTime, this.targetTime, this.windows)
        this.result.accuracy = touch.startTime - this.targetTime
        this.export('accuracyDiff', time.now - touch.startTime)

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects()

        this.despawn = true
    }

    get useFallbackSprites() {
        return !this.sprites.note.exists
    }

    render(y: number) {
        if (this.useFallbackSprites) {
            this.sprites.fallback.note.draw(noteLayout().translate(this.x, y), this.z, 1)
            this.sprites.fallback.marker.draw(this.layout.translate(this.x, y), this.markerZ, 1)
        } else {
            this.sprites.note.draw(this.layout.translate(this.x, y), this.z, 1)
        }
    }
}
