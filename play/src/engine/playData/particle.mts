import { ParticleEffectName } from 'sonolus-core'
import { options } from '../configuration/options.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const particle = defineParticle({
    effects: {
        hit: ParticleEffectName.NoteCircularTapRed,
        flick: ParticleEffectName.NoteCircularAlternativeCyan,
        hold: ParticleEffectName.NoteCircularHoldRed,
    },
})

export const effectLayout = (x: number) =>
    new Rect({
        l: -3 * options.noteEffectSize,
        r: 3 * options.noteEffectSize,
        t: -3 * options.noteEffectSize * scaledScreen.wToH,
        b: 3 * options.noteEffectSize * scaledScreen.wToH,
    }).translate(x, 1)
