import { EffectClipName } from 'sonolus-core'

export const effect = defineEffect({
    clips: {
        perfect: EffectClipName.Perfect,
        great: EffectClipName.Great,
        good: EffectClipName.Good,

        hold: EffectClipName.Hold,
    },
})

export const sfxDistance = 0.02
