import { options } from '../../configuration/options.mjs'
import { skin } from '../skin.mjs'
import { note } from './constants.mjs'
import { archetypes } from './index.mjs'
import { layer } from './layer.mjs'
import { Note } from './notes/Note.mjs'
import { scaledScreen } from './shared.mjs'
import { getZ, noteLayout } from './utils.mjs'

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

    preprocess() {
        this.head.time = bpmChanges.at(this.headData.beat).time

        this.visualTime.min = this.head.time - Note.duration

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
            this.visualTime.hidden = this.tail.time - Note.duration * options.hidden

        this.zs.connector = getZ(layer.connector, this.head.time)
        this.zs.slide = getZ(layer.slide, this.head.time)
    }

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

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

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.trackRef)
    }

    get tailData() {
        return archetypes.HoldEndNote.data.get(this.data.tailRef)
    }

    get isDead() {
        if (options.autoplay) {
            return time.now >= this.tail.time
        } else {
            return this.tailInfo.state === EntityState.Despawned
        }
    }

    renderConnector() {
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

        const hiddenDuration = options.hidden > 0 ? Note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(this.head.time, time.now + hiddenDuration),
            max: Math.min(this.tail.time, time.now + Note.duration),
        }

        const y = {
            min: Math.unlerp(visibleTime.min - Note.duration, visibleTime.min, time.now),
            max: Math.unlerp(visibleTime.max - Note.duration, visibleTime.max, time.now),
        }

        const layout = new Rect({
            l: -note.h / scaledScreen.wToH,
            r: note.h / scaledScreen.wToH,
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
