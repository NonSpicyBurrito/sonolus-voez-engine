import { EngineArchetypeDataName } from '@sonolus/core'
import { toBucketWindows, Windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { options } from '../../../configuration/options.mjs'
import { note, noteLayout } from '../../note.mjs'
import { getZ, layer } from '../../skin.mjs'
import { archetypes } from '../index.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    import = this.defineImport({
        trackRef: { name: 'trackRef', type: Number },
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
        accuracyDiff: { name: 'accuracyDiff', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        despawnTime: Number,
    })

    abstract sprite: SkinSprite

    abstract windows: Windows

    abstract bucket: Bucket

    initialized = this.entityMemory(Boolean)

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        this.bucket.set(toBucketWindows(this.windows))

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.import.beat).time

        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.targetTime))

        this.sharedMemory.despawnTime = this.hitTime

        this.result.time = this.targetTime

        if (!replay.isReplay) {
            this.result.bucket.index = this.bucket.index
        } else if (this.import.judgment) {
            this.result.bucket.index = this.bucket.index
            this.result.bucket.value = this.import.accuracy * 1000
        }
    }

    spawnTime() {
        return this.visualTime.min
    }

    despawnTime() {
        return this.sharedMemory.despawnTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    get hitTime() {
        return (
            this.targetTime +
            (replay.isReplay ? this.import.accuracy + this.import.accuracyDiff : 0)
        )
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.import.trackRef)
    }

    get x() {
        return this.trackSharedMemory.x
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        this.z = getZ(layer.note.body, this.targetTime)
    }

    render() {
        this.y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        this.sprite.draw(noteLayout().translate(this.x, this.y), this.z, 1)
    }
}
