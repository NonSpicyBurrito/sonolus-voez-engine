import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        judgmentLine: SkinSpriteName.JudgmentLine,

        trackBody: 'VOEZ Track Body 2',
        trackLine: 'VOEZ Track Line',
        trackLeftBorder: 'VOEZ Track Left Border',
        trackRightBorder: 'VOEZ Track Right Border',
        trackFallback: SkinSpriteName.Lane,

        trackGlowBody: 'VOEZ Track Glow Body',
        trackGlowLeftBorder: 'VOEZ Track Glow Left Border',
        trackGlowRightBorder: 'VOEZ Track Glow Right Border',

        slot: SkinSpriteName.NoteSlot,

        tapNote: SkinSpriteName.NoteHeadRed,

        slideNote: SkinSpriteName.NoteTickRed,

        flickNote: 'VOEZ Flick',
        flickNoteFallback: SkinSpriteName.NoteHeadCyan,
        flickNoteFallbackMarker: SkinSpriteName.DirectionalMarkerCyan,

        holdStartNote: SkinSpriteName.NoteHeadRed,
        holdConnector: SkinSpriteName.NoteConnectionRed,
    },
})
