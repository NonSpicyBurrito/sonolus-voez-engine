import { windows } from '../../../../../../shared/src/engine/data/windows.mjs'
import { buckets } from '../../buckets.mjs'
import { particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { Note } from './Note.mjs'

export class HoldStartNote extends Note {
    sprite = skin.sprites.holdStartNote

    effect = particle.effects.hit

    windows = windows.holdStartNote

    bucket = buckets.holdStartNote

    render(y: number) {
        if (time.now >= this.targetTime) return

        super.render(y)
    }
}
