import { SkinSpriteName } from 'sonolus-core'

export const skin = defineSkin({
    sprites: {
        judgmentLine: SkinSpriteName.JudgmentLine,

        trackBody0: 'VOEZ Track Body 0',
        trackBody1: 'VOEZ Track Body 1',
        trackBody2: 'VOEZ Track Body 2',
        trackBody3: 'VOEZ Track Body 3',
        trackBody4: 'VOEZ Track Body 4',
        trackBody5: 'VOEZ Track Body 5',
        trackBody6: 'VOEZ Track Body 6',
        trackBody7: 'VOEZ Track Body 7',
        trackBody8: 'VOEZ Track Body 8',
        trackBody9: 'VOEZ Track Body 9',
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
        holdEndNote: SkinSpriteName.NoteTailRed,

        cover: SkinSpriteName.StageCover,
    },
})
