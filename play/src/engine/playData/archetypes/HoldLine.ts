import { ease } from '../../../../../shared/src/engine/data/Ease.js'
import { options } from '../../configuration/options.js'
import { note, noteLayout } from '../note.js'
import { layer, skin } from '../skin.js'
import { archetypes } from './index.js'

export class HoldLine extends SpawnableArchetype({
    time: Number,
    tailRef: Number,
    trackRef: Number,
}) {
    visualTime = this.entityMemory(Range)
    hiddenTime = this.entityMemory(Number)

    x = this.entityMemory(Number)

    initialize() {
        this.visualTime.copyFrom(Range.l.mul(note.duration).add(this.spawnData.time))

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

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

        if (options.hidden > 0 && time.now > this.hiddenTime) return

        this.render()
    }

    get tailInfo() {
        return entityInfos.get(this.spawnData.tailRef)
    }

    get isDead() {
        return time.now >= this.spawnData.time || this.tailInfo.state === EntityState.Despawned
    }

    render() {
        const y = Math.unlerp(this.visualTime.min, this.visualTime.max, time.now)

        skin.sprites.holdLine.draw(noteLayout().translate(this.x, y), layer.holdLine, 1)
    }
}
