import { Ease, ease } from '../../../../../../shared/src/engine/data/Ease.mjs'
import { archetypes } from '../index.mjs'
import { TrackCommand } from '../trackCommands/TrackCommand.mjs'

export abstract class TrackQuery {
    abstract command: TrackCommand

    startTime = 0
    endTime = 0
    startValue = 0
    endValue = 0
    ease = -1 as Ease
    nextRef = 0

    constructor(index: number) {
        const data = archetypes.Track.data.get(index)
        this.startTime = this.endTime = bpmChanges.at(data.startBeat).time
    }

    get(time: number) {
        this.update(time)

        return Math.lerp(this.startValue, this.endValue, this.p(time))
    }

    p(time: number) {
        return ease(this.ease, Math.unlerpClamped(this.startTime, this.endTime, time))
    }

    update(time: number) {
        if (time <= this.endTime) return

        while (this.nextRef) {
            const data = this.command.data.get(this.nextRef)
            const sharedMemory = this.command.sharedMemory.get(this.nextRef)

            if (time < sharedMemory.startTime) return

            this.startTime = sharedMemory.startTime
            this.endTime = sharedMemory.endTime
            this.startValue = data.startValue
            this.endValue = data.endValue
            this.ease = data.ease
            this.nextRef = data.nextRef
        }
    }
}
