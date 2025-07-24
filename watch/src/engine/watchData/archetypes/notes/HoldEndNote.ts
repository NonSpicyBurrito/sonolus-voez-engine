import { windows } from '../../../../../../shared/src/engine/data/windows.js'
import { buckets } from '../../buckets.js'
import { particle } from '../../particle.js'
import { skin } from '../../skin.js'
import { archetypes } from '../index.js'
import { Note } from './Note.js'

export class HoldEndNote extends Note {
    holdImport = this.defineImport({
        headRef: { name: 'headRef', type: Number },
    })

    sprites = {
        note: skin.sprites.holdEndNote,
    }

    effects = {
        perfect: particle.effects.releasePerfect,
        great: particle.effects.releaseGreat,
        good: particle.effects.releaseGood,
        fallback: particle.effects.releaseFallback,
        duration: 0.3,
    }

    windows = windows.holdEndNote

    bucket = buckets.holdEndNote

    get hitTime() {
        return replay.isReplay
            ? this.headImport.judgment
                ? this.targetTime + this.import.accuracy + this.import.accuracyDiff
                : this.headSharedMemory.despawnTime
            : this.targetTime
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.holdImport.headRef)
    }

    get headSharedMemory() {
        return archetypes.HoldStartNote.sharedMemory.get(this.holdImport.headRef)
    }
}
