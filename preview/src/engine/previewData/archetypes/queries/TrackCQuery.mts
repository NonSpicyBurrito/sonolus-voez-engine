import { archetypes } from '../index.mjs'
import { TrackQuery } from './TrackQuery.mjs'

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
