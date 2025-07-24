import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { Note } from './Note.js'

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
