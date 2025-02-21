import { panel } from './panel.mjs'

export const scaledScreen = {
    get hToW() {
        return 20 / panel.h
    },
}
