import { SkinSpriteName } from '@sonolus/core'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    sprites: {
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        trackBody0: 'VOEZ Preview Track Body 0',
        trackBody1: 'VOEZ Preview Track Body 1',
        trackBody2: 'VOEZ Preview Track Body 2',
        trackBody3: 'VOEZ Preview Track Body 3',
        trackBody4: 'VOEZ Preview Track Body 4',
        trackBody5: 'VOEZ Preview Track Body 5',
        trackBody6: 'VOEZ Preview Track Body 6',
        trackBody7: 'VOEZ Preview Track Body 7',
        trackBody8: 'VOEZ Preview Track Body 8',
        trackBody9: 'VOEZ Preview Track Body 9',
        trackLine: 'VOEZ Preview Track Line',
        trackLeftBorder: 'VOEZ Preview Track Left Border',
        trackRightBorder: 'VOEZ Preview Track Right Border',
        trackFallback: SkinSpriteName.Lane,

        tapNote: SkinSpriteName.NoteHeadRed,

        slideNote: SkinSpriteName.NoteTickRed,

        flickNote: 'VOEZ Flick',
        flickNoteFallback: SkinSpriteName.NoteHeadCyan,
        flickNoteFallbackMarker: SkinSpriteName.DirectionalMarkerCyan,

        holdStartNote: SkinSpriteName.NoteHeadRed,
        holdConnector: SkinSpriteName.NoteConnectionRed,
        holdEndNote: SkinSpriteName.NoteTailRed,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
    },
})

export const layer = {
    note: {
        marker: 101,
        body: 100,
    },

    connector: 80,

    track: {
        line: 22,
        border: 21,
        body: 20,
    },

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -8,
            r: 8,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a,
    )
}

export const getZ = (layer: number, time: number) => layer - time / 1000
