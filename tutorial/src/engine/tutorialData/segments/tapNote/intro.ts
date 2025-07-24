import { noteDisplay } from '../../components/noteDisplay.js'

export const tapNoteIntro = {
    enter() {
        noteDisplay.showOverlay('tap')
    },

    exit() {
        noteDisplay.clear()
    },
}
