import { HoldConnector } from './HoldConnector.mjs'
import { HoldLine } from './HoldLine.mjs'
import { Initialization } from './Initialization.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'
import { FlickNote } from './notes/singleNotes/FlickNote.mjs'
import { HoldStartNote } from './notes/singleNotes/HoldStartNote.mjs'
import { SlideNote } from './notes/singleNotes/SlideNote.mjs'
import { TapNote } from './notes/singleNotes/TapNote.mjs'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.mjs'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.mjs'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.mjs'

export const archetypes = defineArchetypes({
    Initialization,

    Stage,

    Track,
    TrackMoveCommand,
    TrackScaleCommand,
    TrackColorCommand,

    TapNote,
    SlideNote,
    FlickNote,

    HoldStartNote,
    HoldEndNote,
    HoldConnector,
    HoldLine,
})
