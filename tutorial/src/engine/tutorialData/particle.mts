import { ParticleEffectName } from '@sonolus/core'
import { scaledScreen } from './scaledScreen.mjs'

export const particle = defineParticle({
    effects: {
        hit: ParticleEffectName.NoteCircularTapRed,
        flick: ParticleEffectName.NoteCircularAlternativeCyan,
        hold: ParticleEffectName.NoteCircularHoldRed,
    },
})

const effectLayout = () =>
    new Rect({
        l: -3,
        r: 3,
        t: -3 * scaledScreen.wToH,
        b: 3 * scaledScreen.wToH,
    }).translate(0, 1)

export const playNoteEffect = () => particle.effects.hit.spawn(effectLayout(), 0.5, false)

export const spawnHoldEffect = () => particle.effects.hold.spawn(effectLayout(), 0.5, true)
