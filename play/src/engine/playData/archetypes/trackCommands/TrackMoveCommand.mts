import { options } from '../../../configuration/options.mjs'
import { TrackCommand } from './TrackCommand.mjs'

export class TrackMoveCommand extends TrackCommand {
    preprocess() {
        super.preprocess()

        if (options.mirror) {
            this.import.startValue *= -1
            this.import.endValue *= -1
        }
    }

    update(value: number) {
        this.trackSharedMemory.x = Math.lerp(this.import.startValue, this.import.endValue, value)
    }
}
