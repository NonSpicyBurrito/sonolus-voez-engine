import { setColor } from '../utils.mjs'
import { TrackCommand } from './TrackCommand.mjs'

export class TrackColorCommand extends TrackCommand {
    update(value: number) {
        setColor(this.trackSharedMemory.c, this.data.startValue, 1 - value)
        setColor(this.trackSharedMemory.c, this.data.endValue, value)
    }
}
