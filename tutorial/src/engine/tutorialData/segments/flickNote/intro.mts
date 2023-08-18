import { flickDisplay } from '../../components/flickDisplay.mjs'

export const flickNoteIntro = {
    enter() {
        flickDisplay.showOverlay()
    },

    exit() {
        flickDisplay.clear()
    },
}
