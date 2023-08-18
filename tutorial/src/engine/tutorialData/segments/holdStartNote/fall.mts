import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'

export const holdStartNoteFall = {
    enter() {
        connector.showFall()
        noteDisplay.showFall('holdStart')
    },

    exit() {
        connector.clear()
        noteDisplay.clear()
    },
}
