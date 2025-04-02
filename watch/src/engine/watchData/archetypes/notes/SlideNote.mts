import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class SlideNote extends Note {
    sprite = skin.sprites.slideNote

    effects = {
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.hitFallback,
    }

    windows = windows.slideNote

    bucket = buckets.slideNote
}
