import { noteDisplay } from '../../components/noteDisplay.mjs'

export const slideNoteIntro = {
    enter() {
        noteDisplay.showOverlay('slide')
    },

    exit() {
        noteDisplay.clear()
    },
}
