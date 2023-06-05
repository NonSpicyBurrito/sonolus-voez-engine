export type VoezSource = {
    notes: Note[]
    tracks: Track[]
}

export type Track = {
    Id: number
    EntranceOn: boolean
    X: number
    Size: number
    Start: number
    End: number
    Move: TrackCommand[]
    Scale: TrackCommand[]
}

export type TrackCommand = {
    To: number
    Ease: string
    Start: number
    End: number
}

export type Note = {
    Type: 'click' | 'hold' | 'slide' | 'swipe'
    Track: number
    Time: number
    Hold: number
    Dir: 0 | 1
}
