import { flickDisplay } from '../../components/flickDisplay.js'

export const flickNoteIntro = {
    enter() {
        flickDisplay.showOverlay()
    },

    exit() {
        flickDisplay.clear()
    },
}
