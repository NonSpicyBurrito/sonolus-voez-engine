import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const holdStartNoteIntro = {
    enter() {
        connector.showOverlay()
        noteDisplay.showOverlay('holdStart')
    },

    exit() {
        connector.clear()
        noteDisplay.clear()
    },
}
