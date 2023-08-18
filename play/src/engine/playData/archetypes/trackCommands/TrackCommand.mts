import { archetypes } from '../index.mjs'

const ease = [
    ['In', 'Sine'],
    ['Out', 'Sine'],
    ['InOut', 'Sine'],
    ['OutIn', 'Sine'],
    ['In', 'Quad'],
    ['Out', 'Quad'],
    ['InOut', 'Quad'],
    ['OutIn', 'Quad'],
    ['In', 'Cubic'],
    ['Out', 'Cubic'],
    ['InOut', 'Cubic'],
    ['OutIn', 'Cubic'],
    ['In', 'Quart'],
    ['Out', 'Quart'],
    ['InOut', 'Quart'],
    ['OutIn', 'Quart'],
    ['In', 'Quint'],
    ['Out', 'Quint'],
    ['InOut', 'Quint'],
    ['OutIn', 'Quint'],
    ['In', 'Expo'],
    ['Out', 'Expo'],
    ['InOut', 'Expo'],
    ['OutIn', 'Expo'],
    ['In', 'Circ'],
    ['Out', 'Circ'],
    ['InOut', 'Circ'],
    ['OutIn', 'Circ'],
    ['In', 'Back'],
    ['Out', 'Back'],
    ['InOut', 'Back'],
    ['OutIn', 'Back'],
    ['In', 'Elastic'],
    ['Out', 'Elastic'],
    ['InOut', 'Elastic'],
    ['OutIn', 'Elastic'],
] as const

export abstract class TrackCommand extends Archetype {
    data = this.defineData({
        trackRef: { name: 'trackRef', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        startValue: { name: 'startValue', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        endValue: { name: 'endValue', type: Number },
        ease: { name: 'ease', type: Number },
    })

    times = this.entityMemory({
        start: Number,
        end: Number,
    })

    preprocess() {
        this.times.start = bpmChanges.at(this.data.startBeat).time
    }

    spawnOrder() {
        return 1000 + this.times.start
    }

    shouldSpawn() {
        return time.now >= this.times.start
    }

    initialize() {
        this.times.end = bpmChanges.at(this.data.endBeat).time
    }

    updateSequential() {
        if (time.now >= this.times.end) {
            this.update(1)

            this.despawn = true
            return
        }

        this.update(this.ease(Math.unlerp(this.times.start, this.times.end, time.now)))
    }

    abstract update(value: number): void

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.data.trackRef)
    }

    ease(x: number) {
        for (const [index, [direction, curve]] of ease.entries()) {
            if (this.data.ease === index) return Math.ease(direction, curve, x)
        }

        return x
    }
}
