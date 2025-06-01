export type Windows = {
    perfect: Range
    great: Range
    good: Range
}

const toMs = ({ min, max }: Range) => new Range(Math.round(min * 1000), Math.round(max * 1000))

export const toBucketWindows = (windows: Windows) => ({
    perfect: toMs(windows.perfect),
    great: toMs(windows.great),
    good: toMs(windows.good),
})

type Seconds = number | [min: number, max: number]

const fromSeconds = (perfect: Seconds, great: Seconds, good: Seconds) => {
    const toWindow = (seconds: Seconds) =>
        typeof seconds === 'number' ? Range.one.mul(seconds) : new Range(...seconds)

    return {
        perfect: toWindow(perfect),
        great: toWindow(great),
        good: toWindow(good),
    }
}

export const windows = {
    tapNote: fromSeconds(0.03, 0.1, 0.15),
    slideNote: fromSeconds(0.03, 0.1, 0.15),
    flickNote: fromSeconds(0.03, 0.1, 0.15),
    holdStartNote: fromSeconds(0.03, 0.1, 0.15),
    holdEndNote: fromSeconds([-0.03, 0], [-0.1, 0], [-0.15, 0]),
}
