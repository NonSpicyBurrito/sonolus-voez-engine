import { options } from '../../configuration/options.mjs'
import { note, noteLayout } from '../note.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldConnector extends Archetype {
    data = this.defineData({
        headRef: { name: 'headRef', type: Number },
        tailRef: { name: 'tailRef', type: Number },
    })

    trackRef = this.entityMemory(Number)

    head = this.entityMemory({
        time: Number,
    })

    tail = this.entityMemory({
        time: Number,
    })

    spawnTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    zs = this.entityMemory({
        connector: Number,
        slide: Number,
    })

    nextLineTime = this.entityMemory(Number)

    preprocess() {
        this.head.time = bpmChanges.at(this.headData.beat).time

        this.visualTime.min = this.head.time - note.duration

        this.spawnTime = this.visualTime.min
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.trackRef = this.headData.trackRef

        this.tail.time = bpmChanges.at(this.tailData.beat).time

        this.visualTime.max = this.tail.time

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.time - note.duration * options.hidden

        this.zs.connector = getZ(layer.connector, this.head.time)
        this.zs.slide = getZ(layer.slide, this.head.time)

        this.nextLineTime = 999999
        if (this.tail.time - this.head.time <= 0.08) return

        let nextRef = this.trackData.moveRef
        while (nextRef) {
            const data = archetypes.TrackMoveCommand.data.get(nextRef)

            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(nextRef)
            if (sharedMemory.startTime >= this.tail.time) break

            if (sharedMemory.endTime > this.head.time) {
                this.nextLineTime = this.head.time + 0.08
                break
            }

            nextRef = data.nextRef
        }
    }

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

        this.spawnLine()

        if (time.now < this.visualTime.min || time.now >= this.visualTime.max) return

        this.renderConnector()

        if (time.now < this.head.time) return

        this.renderSlide()
    }

    get headInfo() {
        return entityInfos.get(this.data.headRef)
    }

    get headData() {
        return archetypes.HoldStartNote.data.get(this.data.headRef)
    }

    get tailInfo() {
        return entityInfos.get(this.data.tailRef)
    }

    get trackData() {
        return archetypes.Track.data.get(this.trackRef)
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.trackRef)
    }

    get tailData() {
        return archetypes.HoldEndNote.data.get(this.data.tailRef)
    }

    get isDead() {
        return this.tailInfo.state === EntityState.Despawned
    }

    spawnLine() {
        if (time.now < this.nextLineTime - note.duration) return

        archetypes.HoldLine.spawn({
            time: this.nextLineTime,
            tailRef: this.data.tailRef,
            trackRef: this.trackRef,
        })

        if ((this.nextLineTime += 0.08) >= this.tail.time) {
            this.nextLineTime = 999999
        }
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.time, time.now + hiddenDuration),
            max: Math.min(this.tail.time, time.now + note.duration),
        }

        const y = {
            min: Math.unlerp(visibleTime.min - note.duration, visibleTime.min, time.now),
            max: Math.unlerp(visibleTime.max - note.duration, visibleTime.max, time.now),
        }

        const w = (note.h * options.noteSize) / scaledScreen.wToH

        const layout = new Rect({
            l: -w,
            r: w,
            t: y.min,
            b: y.max,
        }).translate(this.trackSharedMemory.x, 0)

        skin.sprites.holdConnector.draw(layout, this.zs.connector, 1)
    }

    renderSlide() {
        skin.sprites.holdStartNote.draw(
            noteLayout().translate(this.trackSharedMemory.x, 1),
            this.zs.slide,
            1,
        )
    }
}
