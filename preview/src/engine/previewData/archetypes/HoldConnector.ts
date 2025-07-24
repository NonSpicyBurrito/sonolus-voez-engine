import { options } from '../../configuration/options.js'
import { note } from '../note.js'
import { panel } from '../panel.js'
import { scaledScreen } from '../scaledScreen.js'
import { getZ, layer, skin } from '../skin.js'
import { archetypes } from './index.js'
import { TrackXQuery } from './queries/TrackXQuery.js'

export class HoldConnector extends Archetype {
    import = this.defineImport({
        headRef: { name: 'headRef', type: Number },
        tailRef: { name: 'tailRef', type: Number },
    })

    render() {
        const t = {
            min: bpmChanges.at(this.headImport.beat).time,
            max: bpmChanges.at(this.tailImport.beat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.h),
            max: Math.floor(t.max / panel.h),
        }

        const z = getZ(layer.connector, t.min)

        const xQuery = new TrackXQuery(this.headImport.trackRef)

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

                const pos = {
                    min: new Vec(i * panel.w, st.min - pt),
                    max: new Vec(i * panel.w, st.max - pt),
                }

                const w = note.h * scaledScreen.hToW * options.noteSize

                skin.sprites.holdConnector.draw(
                    new Quad({
                        p1: pos.min.translate(x.min - w, 0),
                        p2: pos.max.translate(x.max - w, 0),
                        p3: pos.max.translate(x.max + w, 0),
                        p4: pos.min.translate(x.min + w, 0),
                    }),
                    z,
                    1,
                )
            }
        }
    }

    get headImport() {
        return archetypes.HoldStartNote.import.get(this.import.headRef)
    }

    get tailImport() {
        return archetypes.HoldEndNote.import.get(this.import.tailRef)
    }
}
