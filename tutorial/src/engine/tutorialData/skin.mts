import { SkinSpriteName } from '@sonolus/core'

export const skin = defineSkin({
    renderMode: 'lightweight',
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

export const layer = {
    note: {
        marker: 101,
        body: 100,
    },

    slide: 90,

    connector: 80,

    slot: 12,
    trackGlow: 11,
    judgmentLine: 10,

    track: {
        line: 2,
        border: 1,
        body: 0,
    },
}
