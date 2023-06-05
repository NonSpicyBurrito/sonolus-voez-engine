import { skin } from '../skin.mjs'
import { note } from './constants.mjs'
import { layer } from './layer.mjs'
import { scaledScreen } from './shared.mjs'

export class Stage extends Archetype {
    spawnOrder() {
        return 2
    }

    updateParallel() {
        this.drawStage()
    }

    drawStage() {
        const layout = new Rect({
            l: scaledScreen.l,
            r: scaledScreen.r,
            t: -note.h,
            b: note.h,
        }).translate(0, 1)

        skin.sprites.judgmentLine.draw(layout, layer.judgmentLine, 1)
    }
}
