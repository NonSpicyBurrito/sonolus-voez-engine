import { archetypes } from '../index.js'
import { TrackQuery } from './TrackQuery.js'

export class TrackCQuery extends TrackQuery {
    get command() {
        return archetypes.TrackColorCommand
    }

    constructor(index: number) {
        super(index)

        const trackImport = archetypes.Track.import.get(index)
        this.startValue = this.endValue = trackImport.c
        this.nextRef = trackImport.colorRef
    }
}
