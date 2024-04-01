import { TrackCommand } from './TrackCommand.mjs'

export class TrackColorCommand extends TrackCommand {
    update(value: number) {
        this.trackSharedMemory.c.set(this.import.startValue, 1 - value)
        this.trackSharedMemory.c.set(this.import.endValue, value)
    }
}
