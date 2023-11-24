import { ease } from '../../../../../shared/src/engine/data/Ease.mjs'
import { options } from '../../configuration/options.mjs'
import { note, noteLayout } from '../note.mjs'
import { layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'

export class HoldLine extends SpawnableArchetype({
    time: Number,
    tailRef: Number,
    trackRef: Number,
}) {
    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    x = this.entityMemory(Number)

    initialize() {
        this.visualTime.max = this.spawnData.time
        this.visualTime.min = this.visualTime.max - note.duration

        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        const data = archetypes.Track.data.get(this.spawnData.trackRef)
        this.x = data.x

        let nextRef = data.moveRef
        while (nextRef) {
            const data = archetypes.TrackMoveCommand.data.get(nextRef)

            const sharedMemory = archetypes.TrackMoveCommand.sharedMemory.get(nextRef)
            if (sharedMemory.startTime > this.spawnData.time) break

            if (sharedMemory.endTime < this.spawnData.time) {
                this.x = data.endValue
            } else {
                this.x = Math.lerp(
                    data.startValue,
                    data.endValue,
                    ease(
                        data.ease,
                        Math.unlerpClamped(
                            sharedMemory.startTime,
                            sharedMemory.endTime,
                            this.spawnData.time,
                        ),
                    ),
                )
                break
            }

            nextRef = data.nextRef
        }
    }

    updateParallel() {
        if (this.isDead) {
            this.despawn = true
            return
        }

        if (options.hidden > 0 && time.now > this.visualTime.hidden) return

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
