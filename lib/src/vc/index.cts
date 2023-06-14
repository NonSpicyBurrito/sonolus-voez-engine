export type VoezChart = {
    offset: number
    bpms: Bpm[]
    tracks: Track[]
}

export type Bpm = {
    beat: number
    bpm: number
}

export type Track = {
    x: number
    w: number
    c: number
    startBeat: number
    endBeat: number
    animateStart: boolean
    moveCommands: TrackCommand[]
    scaleCommands: TrackCommand[]
    colorCommands: TrackCommand[]
    notes: Note[]
}

export type TrackCommand = {
    startBeat: number
    startValue: number
    endBeat: number
    endValue: number
    ease: string
}

export type Note = TapNote | SlideNote | FlickNote | HoldNote

type NoteBase = {
    beat: number
}

export type TapNote = NoteBase & {
    type: 'tap'
}

export type SlideNote = NoteBase & {
    type: 'slide'
}

export type FlickNote = NoteBase & {
    type: 'flick'
    direction: 'left' | 'right'
}

export type HoldNote = NoteBase & {
    type: 'hold'
    toBeat: number
}
