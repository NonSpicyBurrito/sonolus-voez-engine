export const setColor = (colors: number[], i: number, value: number) => {
    if (i === 0) {
        colors[0] = value
    } else if (i === 1) {
        colors[1] = value
    } else if (i === 3) {
        colors[3] = value
    } else if (i === 4) {
        colors[4] = value
    } else if (i === 5) {
        colors[5] = value
    } else if (i === 6) {
        colors[6] = value
    } else if (i === 7) {
        colors[7] = value
    } else if (i === 8) {
        colors[8] = value
    } else if (i === 9) {
        colors[9] = value
    } else {
        colors[2] = value
    }
}
