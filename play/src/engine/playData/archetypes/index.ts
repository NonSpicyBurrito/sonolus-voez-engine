import { HoldConnector } from './HoldConnector.js'
import { HoldLine } from './HoldLine.js'
import { Initialization } from './Initialization.js'
import { InputManager } from './InputManager.js'
import { Stage } from './Stage.js'
import { Track } from './Track.js'
import { FlickNote } from './notes/FlickNote.js'
import { HoldEndNote } from './notes/HoldEndNote.js'
import { SlideNote } from './notes/SlideNote.js'
import { HoldStartNote } from './notes/tapNotes/HoldStartNote.js'
import { TapNote } from './notes/tapNotes/TapNote.js'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.js'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.js'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.js'

export const archetypes = defineArchetypes({
    Initialization,
    InputManager,

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
