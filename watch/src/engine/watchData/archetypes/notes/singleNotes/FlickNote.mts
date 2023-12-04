import { FlickDirection } from '../../../../../../../shared/src/engine/data/FlickDirection.mjs'
import { leftRotated, rightRotated } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../configuration/options.mjs'
import { note, noteLayout } from '../../../note.mjs'
import { particle } from '../../../particle.mjs'
import { scaledScreen } from '../../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class FlickNote extends SingleNote {
    sprite = skin.sprites.flickNote

    fallbackSprites = {
        note: skin.sprites.flickNoteFallback,
        marker: skin.sprites.flickNoteFallbackMarker,
    }

    effect = particle.effects.flick

    flickData = this.defineData({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    layout = this.entityMemory(Quad)
    markerZ = this.entityMemory(Number)

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickData.direction *= -1
    }

    globalInitialize() {
        super.globalInitialize()

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

    get useFallbackSprites() {
        return !this.sprite.exists
    }

    render() {
        this.y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        if (this.useFallbackSprites) {
            this.fallbackSprites.note.draw(noteLayout().translate(this.x, this.y), this.z, 1)
            this.fallbackSprites.marker.draw(this.layout.translate(this.x, this.y), this.markerZ, 1)
        } else {
            this.sprite.draw(this.layout.translate(this.x, this.y), this.z, 1)
        }
    }
}
