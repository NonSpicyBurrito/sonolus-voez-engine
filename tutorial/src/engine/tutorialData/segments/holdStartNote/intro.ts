import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

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
