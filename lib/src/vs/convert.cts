import { VC } from '../vc/index.cjs'
import { VS } from './index.cjs'

const easeMap: Record<string, string | undefined> = {
    easeinsine: 'InSine',
    easeoutsine: 'OutSine',
    easeinoutsine: 'InOutSine',
    easeoutinsine: 'OutInSine',
    easeinquad: 'InQuad',
    easeoutquad: 'OutQuad',
    easeinoutquad: 'InOutQuad',
    easeoutinquad: 'OutInQuad',
    easeincubic: 'InCubic',
    easeoutcubic: 'OutCubic',
    easeinoutcubic: 'InOutCubic',
    easeoutincubic: 'OutInCubic',
    easeinquart: 'InQuart',
    easeoutquart: 'OutQuart',
    easeinoutquart: 'InOutQuart',
    easeoutinquart: 'OutInQuart',
    easeinquint: 'InQuint',
    easeoutquint: 'OutQuint',
    easeinoutquint: 'InOutQuint',
    easeoutinquint: 'OutInQuint',
    easeinexpo: 'InExpo',
    easeoutexpo: 'OutExpo',
    easeinoutexpo: 'InOutExpo',
    easeoutinexpo: 'OutInExpo',
    easeincirc: 'InCirc',
    easeoutcirc: 'OutCirc',
    easeinoutcirc: 'InOutCirc',
    easeoutincirc: 'OutInCirc',
    easeinback: 'InBack',
    easeoutback: 'OutBack',
    easeinoutback: 'InOutBack',
    easeoutinback: 'OutInBack',
    easeinelastic: 'InElastic',
    easeintelastic: 'InElastic',
    easeoutelastic: 'OutElastic',
    easeinoutelastic: 'InOutElastic',
    easeoutinelastic: 'OutInElastic',
}

export const vsToVC = (vs: VS): VC => {
    const vc: VC = {
        offset: 0,
        bpms: [
            {
                beat: 0,
                bpm: 60,
            },
        ],
        tracks: [],
    }

    const x = (pos: number) => (pos * 2 - 1) * 7.29
    const w = (size: number) => size
    const c = (color: number) => color
    const ease = (ease: string) => easeMap[ease] ?? 'Linear'

    for (const track of vs.tracks) {
        let lastX = x(track.X)
        let lastW = w(track.Size)
        let lastC = c(track.Color)

        vc.tracks.push({
            x: lastX,
            w: lastW,
            c: lastC,
            startBeat: track.Start,
            endBeat: track.End,
            animateStart: track.EntranceOn,
            moveCommands: track.Move.map((command) => {
                const startValue = lastX
                const endValue = x(command.To)
                lastX = endValue

                return {
                    startBeat: command.Start,
                    startValue,
                    endBeat: command.End,
                    endValue,
                    ease: ease(command.Ease),
                }
            }),
            scaleCommands: track.Scale.map((command) => {
                const startValue = lastW
                const endValue = w(command.To)
                lastW = endValue

                return {
                    startBeat: command.Start,
                    startValue,
                    endBeat: command.End,
                    endValue,
                    ease: ease(command.Ease),
                }
            }),
            colorCommands: track.ColorChange.map((command) => {
                const startValue = lastC
                const endValue = c(command.To)
                lastC = endValue

                return {
                    startBeat: command.Start,
                    startValue,
                    endBeat: command.End,
                    endValue,
                    ease: ease(command.Ease),
                }
            }),
            notes: vs.notes
                .filter((note) => note.Track === track.Id)
                .map((note) => {
                    switch (note.Type) {
                        case 'click':
                            return {
                                type: 'tap',
                                beat: note.Time,
                            }
                        case 'slide':
                            return {
                                type: 'slide',
                                beat: note.Time,
                            }
                        case 'swipe':
                            return {
                                type: 'flick',
                                beat: note.Time,
                                direction: note.Dir ? 'right' : 'left',
                            }
                        case 'hold':
                            return {
                                type: 'hold',
                                beat: note.Time,
                                toBeat: note.Time + note.Hold,
                            }
                    }
                }),
        })
    }

    return vc
}
