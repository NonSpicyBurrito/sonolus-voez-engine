import { noteDisplay } from '../../components/noteDisplay.js'

export const tapNoteFall = {
    enter() {
        noteDisplay.showFall('tap')
    },

    exit() {
        noteDisplay.clear()
    },
}
