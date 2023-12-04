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
        nextRef: { name: 'nextRef', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        startTime: Number,
        endTime: Number,
    })

    preprocess() {
        this.sharedMemory.startTime = bpmChanges.at(this.data.startBeat).time
        this.sharedMemory.endTime = bpmChanges.at(this.data.endBeat).time
    }

    spawnTime() {
        return this.sharedMemory.startTime
    }

    despawnTime(): number {
        if (this.data.nextRef) {
            const data = archetypes.TrackMoveCommand.data.get(this.data.nextRef)

            return bpmChanges.at(data.startBeat).time
        } else {
            return bpmChanges.at(this.trackData.endBeat).time
        }
    }

    updateSequentialOrder = 1
    updateSequential() {
        this.update(
            this.ease(
                Math.unlerpClamped(
                    this.sharedMemory.startTime,
                    this.sharedMemory.endTime,
                    time.now,
                ),
            ),
        )
    }

    abstract update(value: number): void

    get trackData() {
        return archetypes.Track.data.get(this.data.trackRef)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.data.trackRef)
    }

    ease(x: number) {
        return ease(this.data.ease, x)
    }
}
