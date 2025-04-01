import { HoldConnector } from './HoldConnector.mjs'
import { HoldLine } from './HoldLine.mjs'
import { Initialization } from './Initialization.mjs'
import { InputManager } from './InputManager.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
import { FlickNote } from './notes/FlickNote.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'
import { SlideNote } from './notes/SlideNote.mjs'
import { HoldStartNote } from './notes/tapNotes/HoldStartNote.mjs'
import { TapNote } from './notes/tapNotes/TapNote.mjs'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.mjs'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.mjs'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.mjs'

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
