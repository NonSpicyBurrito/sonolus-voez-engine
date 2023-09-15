import { options } from '../../configuration/options.mjs'
import { chart } from '../chart.mjs'
import { panel } from '../panel.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { TrackCQuery } from './queries/TrackCQuery.mjs'
import { TrackWQuery } from './queries/TrackWQuery.mjs'
import { TrackXQuery } from './queries/TrackXQuery.mjs'

type Values<T = number> = {
    min: T
    max: T
}

type Z = {
    body: number
    line: number
    border: number
}

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
    data = this.defineData({
        x: { name: 'x', type: Number },
        w: { name: 'w', type: Number },
        c: { name: 'c', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        moveRef: { name: 'moveRef', type: Number },
        scaleRef: { name: 'scaleRef', type: Number },
        colorRef: { name: 'colorRef', type: Number },
    })

    preprocess() {
        chart.beats = Math.max(chart.beats, this.data.endBeat)
        chart.duration = Math.max(chart.duration, bpmChanges.at(this.data.endBeat).time)

        if (options.mirror) this.data.x *= -1
    }

    render() {
        const t = {
            min: bpmChanges.at(this.data.startBeat).time,
            max: bpmChanges.at(this.data.endBeat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.h),
            max: Math.floor(t.max / panel.h),
        }

        const z = {
            body: getZ(layer.track.body, -t.min),
            line: getZ(layer.track.line, -t.min),
            border: getZ(layer.track.border, -t.min),
        }

        const xQuery = new TrackXQuery(this.info.index)
        const wQuery = new TrackWQuery(this.info.index)
        const cQuery = new TrackCQuery(this.info.index)

        for (let i = index.min; i <= index.max; i++) {
            const pt = i * panel.h

            for (let j = 0; j < 50; j++) {
                const st = {
                    min: Math.max(t.min, pt + (j / 50) * panel.h),
                    max: Math.min(t.max, pt + ((j + 1) / 50) * panel.h),
                }
                if (st.min >= st.max) continue

                const x = {
                    min: (8 * xQuery.get(st.min)) / 9,
                    max: (8 * xQuery.get(st.max)) / 9,
                }

                const w = {
                    min: (8 * wQuery.get(st.min)) / 9,
                    max: (8 * wQuery.get(st.max)) / 9,
                }

                const pos = {
                    min: new Vec(i * panel.w, st.min - pt),
                    max: new Vec(i * panel.w, st.max - pt),
                }

                if (this.useFallbackTrack) {
                    this.drawFallbackTrack(x, w, pos, z)
                } else {
                    cQuery.update(st.min)
                    const a = cQuery.p(st.min)
                    const c = [
                        [cQuery.endValue, a],
                        [cQuery.startValue, 1 - a],
                    ]

                    this.drawVoezTrack(x, w, c, pos, z)
                }
            }
        }
    }

    drawVoezTrack(x: Values, w: Values, c: number[][], pos: Values<Vec>, z: Z) {
        const l = {
            min: pos.min.translate(x.min - w.min, 0),
            max: pos.max.translate(x.max - w.max, 0),
        }

        const r = {
            min: pos.min.translate(x.min + w.min, 0),
            max: pos.max.translate(x.max + w.max, 0),
        }

        const layout = new Quad({
            p1: l.min,
            p2: l.max,
            p3: r.max,
            p4: r.min,
        })

        for (const [i, sprite] of colorSprites.entries()) {
            const a = i === c[0][0] ? c[0][1] : i === c[1][0] ? c[1][1] : 0
            if (a <= 0) continue

            sprite.draw(layout, z.body - i / 100000, a)
        }

        skin.sprites.trackLine.draw(
            new Quad({
                p1: pos.min.translate(x.min - (8 * 4) / 64 / 9, 0),
                p2: pos.max.translate(x.max - (8 * 4) / 64 / 9, 0),
                p3: pos.max.translate(x.max + (8 * 4) / 64 / 9, 0),
                p4: pos.min.translate(x.min + (8 * 4) / 64 / 9, 0),
            }),
            z.line,
            1,
        )

        skin.sprites.trackLeftBorder.draw(
            new Quad({
                p1: l.min.translate((-8 * 33) / 64 / 9, 0),
                p2: l.max.translate((-8 * 33) / 64 / 9, 0),
                p3: l.max,
                p4: l.min,
            }),
            z.border,
            1,
        )

        skin.sprites.trackRightBorder.draw(
            new Quad({
                p1: r.min,
                p2: r.max,
                p3: r.max.translate((8 * 33) / 64 / 9, 0),
                p4: r.min.translate((8 * 33) / 64 / 9, 0),
            }),
            z.border,
            1,
        )
    }

    drawFallbackTrack(x: Values, w: Values, pos: Values<Vec>, z: Z) {
        skin.sprites.trackFallback.draw(
            new Quad({
                p1: pos.min.translate(x.min - w.min, 0),
                p2: pos.max.translate(x.max - w.max, 0),
                p3: pos.max.translate(x.max + w.max, 0),
                p4: pos.min.translate(x.min + w.min, 0),
            }),
            z.body,
            1,
        )
    }

    get useFallbackTrack() {
        return (
            !colorSprites.every((sprite) => sprite.exists) ||
            !skin.sprites.trackLine.exists ||
            !skin.sprites.trackLeftBorder.exists ||
            !skin.sprites.trackRightBorder.exists
        )
    }
}
