import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.js'
import { HoldConnector } from './HoldConnector.js'
import { Initialization } from './Initialization.js'
import { Stage } from './Stage.js'
import { Track } from './Track.js'
import { FlickNote } from './notes/FlickNote.js'
import { HoldEndNote } from './notes/singleNotes/HoldEndNote.js'
import { HoldStartNote } from './notes/singleNotes/HoldStartNote.js'
import { SlideNote } from './notes/singleNotes/SlideNote.js'
import { TapNote } from './notes/singleNotes/TapNote.js'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.js'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.js'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.js'

export const archetypes = defineArchetypes({
    Initialization,

    [EngineArchetypeName.BpmChange]: BpmChange,

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
