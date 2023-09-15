import { Ease } from '../../../../../../shared/src/engine/data/Ease.mjs'

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
}
