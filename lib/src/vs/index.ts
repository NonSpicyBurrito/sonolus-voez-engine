export type VS = {
    notes: VSNote[]
    tracks: VSTrack[]
}

export type VSTrack = {
    Id: number
    EntranceOn: boolean
    X: number
    Size: number
    Start: number
    End: number
    Color: number
    Move: VSTrackCommand[]
    Scale: VSTrackCommand[]
    ColorChange: VSTrackCommand[]
}

export type VSTrackCommand = {
    To: number
    Ease: string
    Start: number
    End: number
}

export type VSNote = {
    Type: 'click' | 'hold' | 'slide' | 'swipe'
    Track: number
    Time: number
    Hold: number
    Dir: 0 | 1
}
