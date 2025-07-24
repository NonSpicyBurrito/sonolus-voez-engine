import { EngineArchetypeDataName } from '@sonolus/core'
import { ease } from '../../../../../../shared/src/engine/data/Ease.js'
import { options } from '../../../configuration/options.js'
import { note } from '../../note.js'
import { panel } from '../../panel.js'
import { scaledScreen } from '../../scaledScreen.js'
import { getZ, layer } from '../../skin.js'
import { archetypes } from '../index.js'

export abstract class Note extends Archetype {
    import = this.defineImport({
        trackRef: { name: 'trackRef', type: Number },
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
    })

    render() {
        const time = bpmChanges.at(this.import.beat).time

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
        const trackImport = archetypes.Track.import.get(this.import.trackRef)

        let x = trackImport.x

        let ref = trackImport.moveRef
        while (ref) {
            const commandImport = archetypes.TrackMoveCommand.import.get(ref)
            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(ref)

            if (time < sharedMemory.startTime) break

            if (time <= sharedMemory.endTime) {
                x = Math.lerp(
                    commandImport.startValue,
                    commandImport.endValue,
                    ease(
                        commandImport.ease,
                        Math.unlerpClamped(sharedMemory.startTime, sharedMemory.endTime, time),
                    ),
                )
                break
            }

            x = commandImport.endValue
            ref = commandImport.nextRef
        }

        return x
    }
}
