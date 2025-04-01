import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class TapNote extends Note {
    sprite = skin.sprites.tapNote

    effect = particle.effects.hit

    windows = windows.tapNote

    bucket = buckets.tapNote
}
