import { noteDisplay } from '../../components/noteDisplay.mjs'

export const slideNoteFall = {
    enter() {
        noteDisplay.showFall('slide')
    },

    exit() {
        noteDisplay.clear()
    },
}
