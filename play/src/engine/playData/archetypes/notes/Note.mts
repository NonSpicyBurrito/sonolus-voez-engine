import { EngineArchetypeDataName } from 'sonolus-core'
import { options } from '../../../configuration/options.mjs'
import { archetypes } from '../index.mjs'
import { layer } from '../layer.mjs'
import { getZ } from '../utils.mjs'
import { SingleNote } from './singleNotes/SingleNote.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    data = this.defineData({
        trackRef: { name: 'trackRef', type: Number },
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    abstract sprites: {
        note: SkinSprite
    }

    abstract windows: JudgmentWindows

    abstract bucket: Bucket

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    hasSFXScheduled = this.entityMemory(Boolean)

    inputTime = this.entityMemory({
        min: Number,
        max: Number,
    })

    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        const toMs = ({ min, max }: JudgmentWindow) => ({
            min: Math.round(min * 1000),
            max: Math.round(max * 1000),
        })

        this.bucket.set({
            perfect: toMs(this.windows.perfect),
            great: toMs(this.windows.great),
            good: toMs(this.windows.good),
        })

        this.life.miss = -40
    }

    preprocess() {
        this.targetTime = bpmChanges.at(this.data.beat).time

        this.visualTime.max = this.targetTime
        this.visualTime.min = this.visualTime.max - SingleNote.duration
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    initialize() {
        this.inputTime.min = this.targetTime + this.windows.good.min + input.offset
        this.inputTime.max = this.targetTime + this.windows.good.max + input.offset

        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - SingleNote.duration * options.hidden

        this.z = getZ(layer.note, this.targetTime)
    }

    touchOrder = 1

    updateParallel() {
        if (options.autoplay && time.now >= this.targetTime) this.despawn = true
        if (time.now > this.inputTime.max) this.despawn = true
        if (this.despawn) return

        if (this.shouldScheduleSFX && !this.hasSFXScheduled && time.now >= this.scheduleSFXTime)
            this.scheduleSFX()

        if (time.now < this.visualTime.min) return
        if (options.hidden > 0 && time.now > this.visualTime.hidden) return
        if (!this.shouldRender) return

        this.render()
    }

    get shouldScheduleSFX() {
        return options.sfxEnabled && (options.autoplay || options.autoSFX)
    }

    get shouldPlaySFX() {
        return options.sfxEnabled && !options.autoplay && !options.autoSFX
    }

    get trackSharedMemory() {
        return archetypes.Track.sharedMemory.get(this.data.trackRef)
    }

    get x() {
        return this.trackSharedMemory.x
    }

    get hitbox() {
        return this.trackSharedMemory.hitbox
    }

    isInTrack(touch: Touch) {
        return touch.x >= this.hitbox.l && touch.x <= this.hitbox.r
    }

    scheduleSFX() {
        this.hasSFXScheduled = true
    }

    // eslint-disable-next-line @typescript-eslint/class-literal-property-style
    get shouldRender() {
        return true
    }

    render() {
        this.y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)
    }

    static get duration() {
        return Math.remap(1, 10, 1.5, 0.15, options.noteSpeed)
    }
}
