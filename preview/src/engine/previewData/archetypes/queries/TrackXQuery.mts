import { archetypes } from '../index.mjs'
import { TrackQuery } from './TrackQuery.mjs'

export class TrackXQuery extends TrackQuery {
    get command() {
        return archetypes.TrackMoveCommand
    }

    constructor(index: number) {
        super(index)

        const data = archetypes.Track.data.get(index)
        this.startValue = this.endValue = data.x
        this.nextRef = data.moveRef
    }
}
