import { Ease, ease } from '../../../../../../shared/src/engine/data/Ease.js'
import { archetypes } from '../index.js'
import { TrackCommand } from '../trackCommands/TrackCommand.js'

export abstract class TrackQuery {
    abstract command: TrackCommand

    startTime = 0
    endTime = 0
    startValue = 0
    endValue = 0
    ease = -1 as Ease
    nextRef = 0

    constructor(index: number) {
        const trackImport = archetypes.Track.import.get(index)
        this.startTime = this.endTime = bpmChanges.at(trackImport.startBeat).time
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
            const commandImport = this.command.import.get(this.nextRef)
            const sharedMemory = this.command.sharedMemory.get(this.nextRef)

            if (time < sharedMemory.startTime) return

            this.startTime = sharedMemory.startTime
            this.endTime = sharedMemory.endTime
            this.startValue = commandImport.startValue
            this.endValue = commandImport.endValue
            this.ease = commandImport.ease
            this.nextRef = commandImport.nextRef
        }
    }
}
