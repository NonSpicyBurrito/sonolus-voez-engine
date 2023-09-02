import { HoldConnector } from './HoldConnector.mjs'
import { Initialization } from './Initialization.mjs'
import { InputManager } from './InputManager.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'
import { FlickNote } from './notes/singleNotes/FlickNote.mjs'
import { SlideNote } from './notes/singleNotes/simpleNotes/SlideNote.mjs'
import { HoldStartNote } from './notes/singleNotes/simpleNotes/tapNotes/HoldStartNote.mjs'
import { TapNote } from './notes/singleNotes/simpleNotes/tapNotes/TapNote.mjs'
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
})
