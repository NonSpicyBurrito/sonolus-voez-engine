import { archetypes } from '../index.mjs'
import { TrackQuery } from './TrackQuery.mjs'

export class TrackWQuery extends TrackQuery {
    get command() {
        return archetypes.TrackScaleCommand
    }

    constructor(index: number) {
        super(index)

        const data = archetypes.Track.data.get(index)
        this.startValue = this.endValue = data.w
        this.nextRef = data.scaleRef
    }
}
