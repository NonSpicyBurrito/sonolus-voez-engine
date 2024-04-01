import { windows } from '../../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../../buckets.mjs'
import { particle } from '../../../particle.mjs'
import { skin } from '../../../skin.mjs'
import { SingleNote } from './SingleNote.mjs'

export class SlideNote extends SingleNote {
    sprite = skin.sprites.slideNote

    effect = particle.effects.hit

    windows = windows.slideNote

    bucket = buckets.slideNote
}
