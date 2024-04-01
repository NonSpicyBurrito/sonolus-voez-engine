import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class TapNote extends SingleNote {
    sprite = skin.sprites.tapNote

    effect = particle.effects.hit

    windows = windows.tapNote

    bucket = buckets.tapNote
}
