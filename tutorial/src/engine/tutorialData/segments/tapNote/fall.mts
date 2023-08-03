import { noteDisplay } from '../../components/noteDisplay.mjs'

export const tapNoteFall = {
    enter() {
        noteDisplay.showFall('tap')
    },

    exit() {
        noteDisplay.clear()
    },
}
