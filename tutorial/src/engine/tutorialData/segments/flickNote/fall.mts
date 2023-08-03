import { flickDisplay } from '../../components/flickDisplay.mjs'

export const flickNoteFall = {
    enter() {
        flickDisplay.showFall()
    },

    exit() {
        flickDisplay.clear()
    },
}
