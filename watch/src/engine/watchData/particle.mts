import { ParticleEffectName } from '@sonolus/core'
import { options } from '../configuration/options.mjs'
import { scaledScreen } from './scaledScreen.mjs'

export const particle = defineParticle({
    effects: {
        hitPerfect: 'VOEZ Hit Perfect',
        hitGreat: 'VOEZ Hit Great',
        hitGood: 'VOEZ Hit Good',
        hitFallback: ParticleEffectName.NoteCircularTapRed,
        flickFallback: ParticleEffectName.NoteCircularAlternativeCyan,

        holdPerfect: 'VOEZ Hold Perfect',
        holdGreat: 'VOEZ Hold Great',
        holdGood: 'VOEZ Hold Good',
        holdFallback: ParticleEffectName.NoteCircularHoldRed,

        releasePerfect: 'VOEZ Release Perfect',
        releaseGreat: 'VOEZ Release Great',
        releaseGood: 'VOEZ Release Good',
        releaseFallback: ParticleEffectName.NoteCircularTapRed,
    },
})

export const effectLayout = (x: number) =>
    new Rect({
        l: -3 * options.noteEffectSize,
        r: 3 * options.noteEffectSize,
        t: -3 * options.noteEffectSize * scaledScreen.wToH,
        b: 3 * options.noteEffectSize * scaledScreen.wToH,
    }).translate(x, 1)
