import { archetypes } from '../index.mjs'
import { TrackQuery } from './TrackQuery.mjs'

export class TrackXQuery extends TrackQuery {
    get command() {
        return archetypes.TrackMoveCommand
    }

    constructor(index: number) {
        super(index)

        const trackImport = archetypes.Track.import.get(index)
        this.startValue = this.endValue = trackImport.x
        this.nextRef = trackImport.moveRef
    }
}
