import { EngineArchetypeDataName } from 'sonolus-core'
import { ease } from '../../../../../../shared/src/engine/data/Ease.mjs'
import { options } from '../../../configuration/options.mjs'
import { note } from '../../note.mjs'
import { panel } from '../../panel.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZ, layer } from '../../skin.mjs'
import { archetypes } from '../index.mjs'

export abstract class Note extends Archetype {
    data = this.defineData({
        trackRef: { name: 'trackRef', type: Number },
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    render() {
        const time = bpmChanges.at(this.data.beat).time

        const layout = new Rect({
            l: -note.h * scaledScreen.hToW * options.noteSize,
            r: note.h * scaledScreen.hToW * options.noteSize,
            b: -note.h * options.noteSize,
            t: note.h * options.noteSize,
        })
            .add(panel.getPos(time))
            .translate((8 * this.getX(time)) / 9, 0)

        const z = getZ(layer.note.body, time)

        return { time, layout, z }
    }

    getX(time: number) {
        const data = archetypes.Track.data.get(this.data.trackRef)

        let x = data.x

        let ref = data.moveRef
        while (ref) {
            const data = archetypes.TrackMoveCommand.data.get(ref)
            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(ref)

            if (time < sharedMemory.startTime) break

            if (time <= sharedMemory.endTime) {
                x = Math.lerp(
                    data.startValue,
                    data.endValue,
                    ease(
                        data.ease,
                        Math.unlerpClamped(sharedMemory.startTime, sharedMemory.endTime, time),
                    ),
                )
                break
            }

            x = data.endValue
            ref = data.nextRef
        }

        return x
    }
}
