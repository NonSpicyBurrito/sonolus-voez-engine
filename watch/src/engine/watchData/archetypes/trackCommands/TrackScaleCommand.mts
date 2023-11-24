import { TrackCommand } from './TrackCommand.mjs'

export class TrackScaleCommand extends TrackCommand {
    update(value: number) {
        this.trackSharedMemory.w = Math.lerp(this.data.startValue, this.data.endValue, value)
    }
}
