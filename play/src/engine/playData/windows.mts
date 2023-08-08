type Seconds = number | [min: number, max: number]

const fromSeconds = (perfect: Seconds, great: Seconds, good: Seconds) => {
    const toWindow = (seconds: Seconds) =>
        typeof seconds === 'number'
            ? { min: -seconds, max: seconds }
            : { min: seconds[0], max: seconds[1] }

    return {
        perfect: toWindow(perfect),
        great: toWindow(great),
        good: toWindow(good),
    }
}

export const windows = {
    tapNote: fromSeconds(0.03, 0.1, 0.15),
    slideNote: fromSeconds([0, 0.03], [0, 0.1], [0, 0.15]),
    flickNote: fromSeconds(0.03, 0.1, 0.15),
    holdStartNote: fromSeconds(0.03, 0.1, 0.15),
    holdEndNote: fromSeconds([-0.03, 0], [-0.1, 0], [-0.15, 0]),
}
