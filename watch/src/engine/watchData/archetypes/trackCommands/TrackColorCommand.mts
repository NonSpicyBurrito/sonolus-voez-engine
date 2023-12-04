import { TrackCommand } from './TrackCommand.mjs'

export class TrackColorCommand extends TrackCommand {
    update(value: number) {
        for (let i = 0; i < this.trackSharedMemory.c.length; i++) {
            this.trackSharedMemory.c.set(i, 0)
        }
        this.trackSharedMemory.c.set(this.data.startValue, 1 - value)
        this.trackSharedMemory.c.set(this.data.endValue, value)
    }
}
