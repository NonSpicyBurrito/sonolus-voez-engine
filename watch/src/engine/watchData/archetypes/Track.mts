import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { scaledScreen } from '../scaledScreen.mjs'
import { getZ, layer, skin } from '../skin.mjs'

const animateDuration = 1 / 3

const colorSprites = [
    skin.sprites.trackBody0,
    skin.sprites.trackBody1,
    skin.sprites.trackBody2,
    skin.sprites.trackBody3,
    skin.sprites.trackBody4,
    skin.sprites.trackBody5,
    skin.sprites.trackBody6,
    skin.sprites.trackBody7,
    skin.sprites.trackBody8,
    skin.sprites.trackBody9,
]

export class Track extends Archetype {
    import = this.defineImport({
        x: { name: 'x', type: Number },
        w: { name: 'w', type: Number },
        c: { name: 'c', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        animateStart: { name: 'animateStart', type: Boolean },
        moveRef: { name: 'moveRef', type: Number },
    })

    sharedMemory = this.defineSharedMemory({
        x: Number,
        w: Number,
        c: Tuple(colorSprites.length, Number),
    })

    initialized = this.entityMemory(Boolean)

    times = this.entityMemory({
        start: Number,
        started: Number,
        end: Number,
        ended: Number,
    })

    zs = this.entityMemory({
        body: Number,
        line: Number,
        border: Number,
        glow: Number,
        slot: Number,
    })

    preprocess() {
        if (options.mirror) this.import.x *= -1

        this.times.start = bpmChanges.at(this.import.startBeat).time

        this.times.end = bpmChanges.at(this.import.endBeat).time
        this.times.ended = this.times.end + animateDuration
    }

    spawnTime() {
        return this.times.start
    }

    despawnTime() {
        return this.times.ended
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateSequential() {
        this.sharedMemory.x = this.import.x
        this.sharedMemory.w = this.import.w
        for (let i = 0; i < this.sharedMemory.c.length; i++) {
            this.sharedMemory.c.set(i, 0)
        }
        this.sharedMemory.c.set(this.import.c, 1)
    }

    updateParallel() {
        this.drawTrack()
        this.drawSlot()
    }

    get useFallbackTrack() {
        return (
            !colorSprites.every((sprite) => sprite.exists) ||
            !skin.sprites.trackLine.exists ||
            !skin.sprites.trackLeftBorder.exists ||
            !skin.sprites.trackRightBorder.exists
        )
    }

    get shouldDrawTrackGlow() {
        return (
            skin.sprites.trackGlowBody.exists &&
            skin.sprites.trackGlowLeftBorder.exists &&
            skin.sprites.trackGlowRightBorder.exists
        )
    }

    get isActive() {
        const startTime = streams.getPreviousKey(this.info.index, time.now)
        if (startTime < time.now) {
            const endTime = streams.getValue(this.info.index, startTime)
            if (time.now < endTime) return true
        }

        return false
    }

    globalInitialize() {
        this.times.started = this.times.start + (this.import.animateStart ? animateDuration : 0)

        this.zs.body = getZ(layer.track.body, -this.times.start)
        this.zs.line = getZ(layer.track.line, -this.times.start)
        this.zs.border = getZ(layer.track.border, -this.times.start)
        this.zs.glow = getZ(layer.trackGlow, -this.times.start)
        this.zs.slot = getZ(layer.slot, -this.times.start)
    }

    drawTrack() {
        let w = this.sharedMemory.w
        let h = scaledScreen.t - 1

        if (time.now > this.times.end) {
            const s = Math.unlerp(this.times.ended, this.times.end, time.now)

            w = Math.max(0, w * Math.ease('In', 'Elastic', s))
            h *= Math.ease('In', 'Expo', s)
        } else if (time.now < this.times.started) {
            const s = Math.unlerp(this.times.start, this.times.started, time.now)

            w *= Math.ease('Out', 'Elastic', s)
            h *= Math.ease('Out', 'Expo', s)
        }

        if (this.useFallbackTrack) {
            this.drawFallbackTrack(w, h)
        } else {
            this.drawVoezTrack(w, h)
        }

        if (this.shouldDrawTrackGlow) {
            this.drawTrackGlow(w, h)
        }
    }

    drawVoezTrack(w: number, h: number) {
        const l = this.sharedMemory.x - w
        const r = this.sharedMemory.x + w

        const bodyLayout = new Rect({
            l,
            r,
            t: h,
            b: 0,
        }).translate(0, 1)

        for (const [i, sprite] of colorSprites.entries()) {
            const a = this.sharedMemory.c.get(i)
            if (a <= 0) continue

            sprite.draw(bodyLayout, this.zs.body, a)
        }

        const lineLayout = new Rect({
            l: -4 / 128,
            r: 4 / 128,
            t: h,
            b: 0,
        }).translate(this.sharedMemory.x, 1)

        skin.sprites.trackLine.draw(lineLayout, this.zs.line, 1)

        const leftLayout = new Rect({
            l: -33 / 128,
            r: 0,
            t: h,
            b: 0,
        }).translate(l, 1)

        skin.sprites.trackLeftBorder.draw(leftLayout, this.zs.border, 1)

        const rightLayout = new Rect({
            l: 0,
            r: 33 / 128,
            t: h,
            b: 0,
        }).translate(r, 1)

        skin.sprites.trackRightBorder.draw(rightLayout, this.zs.border, 1)
    }

    drawFallbackTrack(w: number, h: number) {
        const layout = new Rect({
            l: -w,
            r: w,
            t: h,
            b: 0,
        }).translate(this.sharedMemory.x, 1)

        skin.sprites.trackFallback.draw(layout, this.zs.body, 1)
    }

    drawTrackGlow(w: number, h: number) {
        if (!options.laneEffectEnabled) return
        if (!this.isActive) return

        const l = this.sharedMemory.x - w
        const r = this.sharedMemory.x + w

        const b = (-27 / 128) * h
        const t = b + h

        const bodyLayout = new Rect({
            l,
            r,
            t,
            b,
        }).translate(0, 1)

        skin.sprites.trackGlowBody.draw(bodyLayout, this.zs.glow, 1)

        const leftLayout = new Rect({
            l: -52 / 128,
            r: 0,
            t,
            b,
        }).translate(l, 1)

        skin.sprites.trackGlowLeftBorder.draw(leftLayout, this.zs.glow, 1)

        const rightLayout = new Rect({
            l: 0,
            r: 52 / 128,
            t,
            b,
        }).translate(r, 1)

        skin.sprites.trackGlowRightBorder.draw(rightLayout, this.zs.glow, 1)
    }

    drawSlot() {
        let h = note.h * options.noteSize

        if (time.now > this.times.end) {
            const s = Math.unlerp(this.times.ended, this.times.end, time.now)

            h *= Math.ease('Out', 'Expo', s)
        } else if (time.now < this.times.started) {
            const s = Math.unlerp(this.times.start, this.times.started, time.now)

            h *= Math.ease('Out', 'Elastic', s)
        }

        const w = h / scaledScreen.wToH

        const layout = new Rect({
            l: -w,
            r: w,
            t: -h,
            b: h,
        }).translate(this.sharedMemory.x, 1)

        skin.sprites.slot.draw(layout, this.zs.slot, 1)
    }
}
