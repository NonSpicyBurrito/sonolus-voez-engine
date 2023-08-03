import { ParticleEffectName } from 'sonolus-core'

export const particle = defineParticle({
    effects: {
        hit: ParticleEffectName.NoteCircularTapRed,
        flick: ParticleEffectName.NoteCircularAlternativeCyan,
        hold: ParticleEffectName.NoteCircularHoldRed,
    },
})
