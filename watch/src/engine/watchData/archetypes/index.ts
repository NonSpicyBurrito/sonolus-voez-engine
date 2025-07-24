import { HoldConnector } from './HoldConnector.js'
import { HoldLine } from './HoldLine.js'
import { Initialization } from './Initialization.js'
import { FlickNote } from './notes/FlickNote.js'
import { HoldEndNote } from './notes/HoldEndNote.js'
import { HoldStartNote } from './notes/HoldStartNote.js'
import { SlideNote } from './notes/SlideNote.js'
import { TapNote } from './notes/TapNote.js'
import { Stage } from './Stage.js'
import { Track } from './Track.js'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.js'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.js'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.js'

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
