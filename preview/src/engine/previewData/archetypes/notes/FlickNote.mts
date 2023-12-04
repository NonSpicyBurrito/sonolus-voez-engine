import { FlickDirection } from '../../../../../../shared/src/engine/data/FlickDirection.mjs'
import { leftRotated, rightRotated } from '../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../configuration/options.mjs'
import { note } from '../../note.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, layer, skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class FlickNote extends Note {
    flickData = this.defineData({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickData.direction *= -1
    }

    render() {
        const { time, layout, z } = super.render()

        if (this.useFallbackSprites) {
            skin.sprites.flickNoteFallback.draw(layout, z, 1)

            const markerZ = getZ(layer.note.marker, time)

            const s = note.h * scaledScreen.hToW * options.noteSize

            if (this.flickData.direction === FlickDirection.Left) {
                skin.sprites.flickNoteFallbackMarker.draw(
                    leftRotated(layout).translate(-s, 0),
                    markerZ,
                    1,
                )
            } else {
                skin.sprites.flickNoteFallbackMarker.draw(
                    rightRotated(layout).translate(s, 0),
                    markerZ,
                    1,
                )
            }
        } else {
            if (this.flickData.direction === FlickDirection.Left) {
                skin.sprites.flickNote.draw(leftRotated(layout), z, 1)
            } else {
                skin.sprites.flickNote.draw(rightRotated(layout), z, 1)
            }
        }

        return { time, layout, z }
    }

    get useFallbackSprites() {
        return !skin.sprites.flickNote.exists
    }
}
