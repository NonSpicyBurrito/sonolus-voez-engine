import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldEndNote extends Note {
    holdImport = this.defineImport({
        headRef: { name: 'headRef', type: Number },
    })

    sprite = skin.sprites.holdEndNote

    effects = {
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.hitFallback,
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
