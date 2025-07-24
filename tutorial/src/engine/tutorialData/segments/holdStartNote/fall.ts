import { connector } from '../../components/connector.js'
import { noteDisplay } from '../../components/noteDisplay.js'

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
