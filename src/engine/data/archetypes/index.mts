import { Initialization } from './Initialization.mjs'
import { InputManager } from './InputManager.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
import { FlickNote } from './notes/singleNotes/flickNotes/FlickNote.mjs'
import { SlideNote } from './notes/singleNotes/simpleNotes/SlideNote.mjs'
import { HoldStartNote } from './notes/singleNotes/simpleNotes/tapNotes/HoldStartNote.mjs'
import { TapNote } from './notes/singleNotes/simpleNotes/tapNotes/TapNote.mjs'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.mjs'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.mjs'

import { HoldConnector } from './HoldConnector.mjs'
import { HoldEndNote } from './notes/HoldEndNote.mjs'

export const archetypes = defineArchetypes({
    Initialization,
    InputManager,

    Stage,

    Track,
    TrackMoveCommand,
    TrackScaleCommand,

    TapNote,
    SlideNote,
    FlickNote,

    HoldStartNote,
    HoldEndNote,
    HoldConnector,
})
