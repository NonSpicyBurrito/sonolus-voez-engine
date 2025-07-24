import { noteDisplay } from '../../components/noteDisplay.js'

export const slideNoteIntro = {
    enter() {
        noteDisplay.showOverlay('slide')
    },

    exit() {
        noteDisplay.clear()
    },
}
