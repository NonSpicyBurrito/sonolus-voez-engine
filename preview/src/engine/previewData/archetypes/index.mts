import { EngineArchetypeName } from '@sonolus/core'
import { BpmChange } from './BpmChange.mjs'
import { HoldConnector } from './HoldConnector.mjs'
import { Initialization } from './Initialization.mjs'
import { Stage } from './Stage.mjs'
import { Track } from './Track.mjs'
import { FlickNote } from './notes/FlickNote.mjs'
import { HoldEndNote } from './notes/singleNotes/HoldEndNote.mjs'
import { HoldStartNote } from './notes/singleNotes/HoldStartNote.mjs'
import { SlideNote } from './notes/singleNotes/SlideNote.mjs'
import { TapNote } from './notes/singleNotes/TapNote.mjs'
import { TrackColorCommand } from './trackCommands/TrackColorCommand.mjs'
import { TrackMoveCommand } from './trackCommands/TrackMoveCommand.mjs'
import { TrackScaleCommand } from './trackCommands/TrackScaleCommand.mjs'

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
