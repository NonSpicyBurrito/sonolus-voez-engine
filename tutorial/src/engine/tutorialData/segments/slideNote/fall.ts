import { noteDisplay } from '../../components/noteDisplay.js'

export const slideNoteFall = {
    enter() {
        noteDisplay.showFall('slide')
    },

    exit() {
        noteDisplay.clear()
    },
}
