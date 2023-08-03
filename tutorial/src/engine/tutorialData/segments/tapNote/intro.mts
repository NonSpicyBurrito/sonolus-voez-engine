import { noteDisplay } from '../../components/noteDisplay.mjs'

export const tapNoteIntro = {
    enter() {
        noteDisplay.showOverlay('tap')
    },

    exit() {
        noteDisplay.clear()
    },
}
