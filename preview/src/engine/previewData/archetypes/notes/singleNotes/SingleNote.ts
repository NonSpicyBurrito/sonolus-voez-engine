import { layer } from '../../../skin.js'
import { Note } from '../Note.js'

export abstract class SingleNote extends Note {
    abstract sprite: SkinSprite

    render() {
        const { time, layout } = super.render()

        this.sprite.draw(layout, [layer.note.body, -time], 1)

        return { time, layout }
    }
}
