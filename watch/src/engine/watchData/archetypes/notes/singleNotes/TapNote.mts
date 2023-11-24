import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class TapNote extends SingleNote {
    sprite = skin.sprites.tapNote

    effect = particle.effects.hit
}
