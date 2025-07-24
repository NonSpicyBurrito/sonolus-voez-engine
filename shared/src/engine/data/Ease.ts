export enum Ease {
    InSine,
    OutSine,
    InOutSine,
    OutInSine,
    InQuad,
    OutQuad,
    InOutQuad,
    OutInQuad,
    InCubic,
    OutCubic,
    InOutCubic,
    OutInCubic,
    InQuart,
    OutQuart,
    InOutQuart,
    OutInQuart,
    InQuint,
    OutQuint,
    InOutQuint,
    OutInQuint,
    InExpo,
    OutExpo,
    InOutExpo,
    OutInExpo,
    InCirc,
    OutCirc,
    InOutCirc,
    OutInCirc,
    InBack,
    OutBack,
    InOutBack,
    OutInBack,
    InElastic,
    OutElastic,
    InOutElastic,
    OutInElastic,
}

export const ease = (ease: Ease, value: number) => {
    switch (ease) {
        case Ease.InSine:
            return Math.ease('In', 'Sine', value)
        case Ease.OutSine:
            return Math.ease('Out', 'Sine', value)
        case Ease.InOutSine:
            return Math.ease('InOut', 'Sine', value)
        case Ease.OutInSine:
            return Math.ease('OutIn', 'Sine', value)
        case Ease.InQuad:
            return Math.ease('In', 'Quad', value)
        case Ease.OutQuad:
            return Math.ease('Out', 'Quad', value)
        case Ease.InOutQuad:
            return Math.ease('InOut', 'Quad', value)
        case Ease.OutInQuad:
            return Math.ease('OutIn', 'Quad', value)
        case Ease.InCubic:
            return Math.ease('In', 'Cubic', value)
        case Ease.OutCubic:
            return Math.ease('Out', 'Cubic', value)
        case Ease.InOutCubic:
            return Math.ease('InOut', 'Cubic', value)
        case Ease.OutInCubic:
            return Math.ease('OutIn', 'Cubic', value)
        case Ease.InQuart:
            return Math.ease('In', 'Quart', value)
        case Ease.OutQuart:
            return Math.ease('Out', 'Quart', value)
        case Ease.InOutQuart:
            return Math.ease('InOut', 'Quart', value)
        case Ease.OutInQuart:
            return Math.ease('OutIn', 'Quart', value)
        case Ease.InQuint:
            return Math.ease('In', 'Quint', value)
        case Ease.OutQuint:
            return Math.ease('Out', 'Quint', value)
        case Ease.InOutQuint:
            return Math.ease('InOut', 'Quint', value)
        case Ease.OutInQuint:
            return Math.ease('OutIn', 'Quint', value)
        case Ease.InExpo:
            return Math.ease('In', 'Expo', value)
        case Ease.OutExpo:
            return Math.ease('Out', 'Expo', value)
        case Ease.InOutExpo:
            return Math.ease('InOut', 'Expo', value)
        case Ease.OutInExpo:
            return Math.ease('OutIn', 'Expo', value)
        case Ease.InCirc:
            return Math.ease('In', 'Circ', value)
        case Ease.OutCirc:
            return Math.ease('Out', 'Circ', value)
        case Ease.InOutCirc:
            return Math.ease('InOut', 'Circ', value)
        case Ease.OutInCirc:
            return Math.ease('OutIn', 'Circ', value)
        case Ease.InBack:
            return Math.ease('In', 'Back', value)
        case Ease.OutBack:
            return Math.ease('Out', 'Back', value)
        case Ease.InOutBack:
            return Math.ease('InOut', 'Back', value)
        case Ease.OutInBack:
            return Math.ease('OutIn', 'Back', value)
        case Ease.InElastic:
            return Math.ease('In', 'Elastic', value)
        case Ease.OutElastic:
            return Math.ease('Out', 'Elastic', value)
        case Ease.InOutElastic:
            return Math.ease('InOut', 'Elastic', value)
        case Ease.OutInElastic:
            return Math.ease('OutIn', 'Elastic', value)
        default:
            return value
    }
}
