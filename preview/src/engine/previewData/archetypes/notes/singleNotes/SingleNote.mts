import { Note } from '../Note.mjs'

export abstract class SingleNote extends Note {
    abstract sprite: SkinSprite

    render() {
        const { time, layout, z } = super.render()

        this.sprite.draw(layout, z, 1)

        return { time, layout, z }
    }
}
