import { archetypes } from '../index.js'
import { TrackQuery } from './TrackQuery.js'

export class TrackWQuery extends TrackQuery {
    get command() {
        return archetypes.TrackScaleCommand
    }

    constructor(index: number) {
        super(index)

        const trackImport = archetypes.Track.import.get(index)
        this.startValue = this.endValue = trackImport.w
        this.nextRef = trackImport.scaleRef
    }
}
