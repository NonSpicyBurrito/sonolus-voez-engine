import { HoldConnector } from './HoldConnector.mjs'
import { HoldLine } from './HoldLine.mjs'
import { Initialization } from './Initialization.mjs'
import { FlickNote } from './notes/FlickNote.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'
import { HoldStartNote } from './notes/HoldStartNote.mjs'
import { SlideNote } from './notes/SlideNote.mjs'
import { TapNote } from './notes/TapNote.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
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
