import { Ease, ease } from '../../../../../../shared/src/engine/data/Ease.mjs'
import { archetypes } from '../index.mjs'

export abstract class TrackCommand extends Archetype {
    data = this.defineData({
        trackRef: { name: 'trackRef', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        startValue: { name: 'startValue', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        endValue: { name: 'endValue', type: Number },
        ease: { name: 'ease', type: DataType<Ease> },
    })

    times = this.entityMemory({
        start: Number,
        end: Number,
    })

    preprocess() {
        this.times.start = bpmChanges.at(this.data.startBeat).time
    }

    spawnOrder() {
        return 1000 + this.times.start
    }

    shouldSpawn() {
        return time.now >= this.times.start
    }

    initialize() {
        this.times.end = bpmChanges.at(this.data.endBeat).time
    }

    updateSequential() {
        if (time.now >= this.times.end) {
            this.update(1)

            this.despawn = true
            return
        }

        this.update(this.ease(Math.unlerp(this.times.start, this.times.end, time.now)))
    }

    abstract update(value: number): void

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.data.trackRef)
    }

    ease(x: number) {
        return ease(this.data.ease, x)
    }
}
