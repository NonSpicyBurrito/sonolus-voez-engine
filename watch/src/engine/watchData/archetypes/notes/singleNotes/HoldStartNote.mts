import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class HoldStartNote extends SingleNote {
    sprite = skin.sprites.holdStartNote

    effect = particle.effects.hit
}
