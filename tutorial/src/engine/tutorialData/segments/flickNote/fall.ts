import { flickDisplay } from '../../components/flickDisplay.js'

export const flickNoteFall = {
    enter() {
        flickDisplay.showFall()
    },

    exit() {
        flickDisplay.clear()
    },
}
