import { archetypes } from '../index.mjs'
import { TrackQuery } from './TrackQuery.mjs'

export class TrackCQuery extends TrackQuery {
    get command() {
        return archetypes.TrackColorCommand
    }

    constructor(index: number) {
        super(index)

        const data = archetypes.Track.data.get(index)
        this.startValue = this.endValue = data.c
        this.nextRef = data.colorRef
    }
}
