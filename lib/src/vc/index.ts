export type VC = {
    bpms: VCBpm[]
    tracks: VCTrack[]
}

export type VCBpm = {
    beat: number
    bpm: number
}

export type VCTrack = {
    x: number
    w: number
    c: number
    startBeat: number
    endBeat: number
    animateStart: boolean
    moveCommands: VCTrackCommand[]
    scaleCommands: VCTrackCommand[]
    colorCommands: VCTrackCommand[]
    notes: VCNote[]
}

export type VCTrackCommand = {
    startBeat: number
    startValue: number
    endBeat: number
    endValue: number
    ease: string
}

export type VCNote = VCTapNote | VCSlideNote | VCFlickNote | VCHoldNote

type BaseVCNote = {
    beat: number
}

export type VCTapNote = BaseVCNote & {
    type: 'tap'
}

export type VCSlideNote = BaseVCNote & {
    type: 'slide'
}

export type VCFlickNote = BaseVCNote & {
    type: 'flick'
    direction: 'left' | 'right'
}

export type VCHoldNote = BaseVCNote & {
    type: 'hold'
    toBeat: number
}
