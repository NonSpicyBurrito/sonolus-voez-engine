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

    sprites = {
        note: skin.sprites.holdEndNote,
    }

    effects = {
        perfect: particle.effects.hitPerfect,
        great: particle.effects.hitGreat,
        good: particle.effects.hitGood,
        fallback: particle.effects.hitFallback,
    }

    windows = windows.holdEndNote

    bucket = buckets.holdEndNote

    preprocess() {
        super.preprocess()

        const minHeadInputTime =
            bpmChanges.at(this.headImport.beat).time + windows.holdStartNote.good.min + input.offset

        this.spawnTime = Math.min(this.visualTime.min, minHeadInputTime)
    }

    updateParallel() {
        if (this.headSharedMemory.judgment) {
            this.handleInput()
        } else if (this.headInfo.state === EntityState.Despawned) {
            this.despawn = true
        }

        super.updateParallel()
    }

    get headInfo() {
        return entityInfos.get(this.holdImport.headRef)
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.holdImport.headRef)
    }

    get headSharedMemory() {
        return archetypes.HoldStartNote.sharedMemory.get(this.holdImport.headRef)
    }

    handleInput() {
        if (time.now < this.inputTime.max && this.trackSharedMemory.isActive) return

        if (time.now >= this.inputTime.min) {
            const hitTime = Math.min(time.now - input.offset, this.targetTime)

            this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
            this.result.accuracy = hitTime - this.targetTime

            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.result.accuracy * 1000
        }

        this.playHitEffects()

        this.export('accuracyDiff', time.now - this.result.accuracy - this.targetTime)

        this.despawn = true
    }
}
