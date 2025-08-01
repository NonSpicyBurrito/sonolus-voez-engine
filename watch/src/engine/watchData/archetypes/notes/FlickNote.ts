import { FlickDirection } from '../../../../../../shared/src/engine/data/FlickDirection.js'
import { leftRotated, rightRotated } from '../../../../../../shared/src/engine/data/utils.js'
import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { options } from '../../../configuration/options.js'
import { buckets } from '../../buckets.js'
import { note, noteLayout } from '../../note.js'
import { particle } from '../../particle.js'
import { scaledScreen } from '../../scaledScreen.js'
import { getZ, layer, skin } from '../../skin.js'
import { Note } from './Note.js'

export class FlickNote extends Note {
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

    flickImport = this.defineImport({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    layout = this.entityMemory(Quad)
    markerZ = this.entityMemory(Number)

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickImport.direction *= -1
    }

    globalInitialize() {
        super.globalInitialize()

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
