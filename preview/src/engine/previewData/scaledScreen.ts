import { panel } from './panel.js'

export const scaledScreen = {
    get hToW() {
        return 20 / panel.h
    },
}
