import { ParticleEffectName } from '@sonolus/core'
import { scaledScreen } from './scaledScreen.js'

export const particle = defineParticle({
    effects: {
        hitPerfect: 'VOEZ Hit Perfect',
        hitFallback: ParticleEffectName.NoteCircularTapRed,
        flickFallback: ParticleEffectName.NoteCircularAlternativeCyan,

        holdPerfect: 'VOEZ Hold Perfect',
        holdFallback: ParticleEffectName.NoteCircularHoldRed,
    },
})

const effectLayout = () =>
    new Rect({
        l: -3,
        r: 3,
        t: -3 * scaledScreen.wToH,
        b: 3 * scaledScreen.wToH,
    }).translate(0, 1)

export const playHitEffect = () => {
    if (particle.effects.hitPerfect.exists) {
        particle.effects.hitPerfect.spawn(effectLayout(), 0.5, false)
    } else {
        particle.effects.hitFallback.spawn(effectLayout(), 0.5, false)
    }
}

export const playFlickEffect = () => {
    if (particle.effects.hitPerfect.exists) {
        particle.effects.hitPerfect.spawn(effectLayout(), 0.5, false)
    } else {
        particle.effects.flickFallback.spawn(effectLayout(), 0.5, false)
    }
}

export const spawnHoldEffect = () => {
    if (particle.effects.holdPerfect.exists) {
        return particle.effects.holdPerfect.spawn(effectLayout(), 1, true)
    } else {
        return particle.effects.holdFallback.spawn(effectLayout(), 1, true)
    }
}
