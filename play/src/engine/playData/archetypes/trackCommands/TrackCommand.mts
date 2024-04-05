import { Ease, ease } from '../../../../../../shared/src/engine/data/Ease.mjs'
import { archetypes } from '../index.mjs'

export abstract class TrackCommand extends Archetype {
    import = this.defineImport({
        trackRef: { name: 'trackRef', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        startValue: { name: 'startValue', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        endValue: { name: 'endValue', type: Number },
        ease: { name: 'ease', type: DataType<Ease> },
        nextRef: { name: 'nextRef', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        startTime: Number,
        endTime: Number,
    })

    preprocess() {
        this.sharedMemory.startTime = bpmChanges.at(this.import.startBeat).time
        this.sharedMemory.endTime = bpmChanges.at(this.import.endBeat).time
    }

    spawnOrder() {
        return 1000 + this.sharedMemory.startTime
    }

    shouldSpawn() {
        return time.now >= this.sharedMemory.startTime
    }

    updateSequential() {
        if (time.now >= this.sharedMemory.endTime) {
            this.update(1)

            this.despawn = true
            return
        }

        this.update(
            this.ease(
                Math.unlerp(this.sharedMemory.startTime, this.sharedMemory.endTime, time.now),
            ),
        )
    }

    abstract update(value: number): void

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.import.trackRef)
    }

    ease(x: number) {
        return ease(this.import.ease, x)
    }
}
