import { options } from '../../../configuration/options.mjs'
import { TrackCommand } from './TrackCommand.mjs'

export class TrackMoveCommand extends TrackCommand {
    preprocess() {
        super.preprocess()

        if (options.mirror) {
            this.data.startValue *= -1
            this.data.endValue *= -1
        }
    }
}
