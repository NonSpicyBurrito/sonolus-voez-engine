import { Ease, ease } from '../../../../../../shared/src/engine/data/Ease.js'
import { archetypes } from '../index.js'

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

    spawnTime() {
        return this.sharedMemory.startTime
    }

    despawnTime(): number {
        if (this.import.nextRef) {
            const commandImport = archetypes.TrackMoveCommand.import.get(this.import.nextRef)

            return bpmChanges.at(commandImport.startBeat).time
        } else {
            return bpmChanges.at(this.trackImport.endBeat).time
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

    get trackImport() {
        return archetypes.Track.import.get(this.import.trackRef)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.import.trackRef)
    }

    ease(x: number) {
        return ease(this.import.ease, x)
    }
}
