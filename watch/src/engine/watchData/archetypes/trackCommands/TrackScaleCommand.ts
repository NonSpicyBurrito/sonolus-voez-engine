import { TrackCommand } from './TrackCommand.js'

export class TrackScaleCommand extends TrackCommand {
    update(value: number) {
        this.trackSharedMemory.w = Math.lerp(this.import.startValue, this.import.endValue, value)
    }
}
