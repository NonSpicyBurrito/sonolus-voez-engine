import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class HoldStartNote extends Note {
    sprites = {
        note: skin.sprites.holdStartNote,
    }

    effects = {
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.hitFallback,
        duration: 0.5,
    }

    windows = windows.holdStartNote

    bucket = buckets.holdStartNote

    render(y: number) {
        if (time.now >= this.targetTime) return

        super.render(y)
    }
}
