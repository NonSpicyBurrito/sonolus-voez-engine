import { ease } from '../../../../../shared/src/engine/data/Ease.mjs'
import { options } from '../../configuration/options.mjs'
import { note, noteLayout } from '../note.mjs'
import { layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldLine extends SpawnableArchetype({
    time: Number,
    trackRef: Number,
}) {
    initialized = this.entityMemory(Boolean)

    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    x = this.entityMemory(Number)

    spawnTime() {
        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.spawnData.time))

        return this.visualTime.min
    }

    despawnTime() {
        return this.visualTime.max
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

    globalInitialize() {
        if (options.hidden > 0)
            this.hiddenTime = this.visualTime.max - note.duration * options.hidden

        const trackImport = archetypes.Track.import.get(this.spawnData.trackRef)
        this.x = trackImport.x

        let nextRef = trackImport.moveRef
        while (nextRef) {
            const commandImport = archetypes.TrackMoveCommand.import.get(nextRef)

            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(nextRef)
            if (sharedMemory.startTime > this.spawnData.time) break

            if (sharedMemory.endTime < this.spawnData.time) {
                this.x = commandImport.endValue
            } else {
                this.x = Math.lerp(
                    commandImport.startValue,
                    commandImport.endValue,
                    ease(
                        commandImport.ease,
                        Math.unlerpClamped(
                            sharedMemory.startTime,
                            sharedMemory.endTime,
                            this.spawnData.time,
                        ),
                    ),
                )
                break
            }

            nextRef = commandImport.nextRef
        }
    }

    render() {
        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        skin.sprites.holdLine.draw(noteLayout().translate(this.x, y), layer.holdLine, 1)
    }
}
