import { particle } from '../../../../particle.mjs'
import { noteLayout } from '../../../utils.mjs'
import { SingleNote } from '../SingleNote.mjs'

export abstract class SimpleNote extends SingleNote {
    effects = {
        hit: particle.effects.hit,
    }

    render() {
        super.render()

        this.sprites.note.draw(noteLayout().translate(this.x, this.y), this.z, 1)
    }
}
