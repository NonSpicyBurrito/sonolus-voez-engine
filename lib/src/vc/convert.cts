import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from 'sonolus-core'
import { TrackCommand, VoezChart } from './index.cjs'

const ease = [
    'InSine',
    'OutSine',
    'InOutSine',
    'OutInSine',
    'InQuad',
    'OutQuad',
    'InOutQuad',
    'OutInQuad',
    'InCubic',
    'OutCubic',
    'InOutCubic',
    'OutInCubic',
    'InQuart',
    'OutQuart',
    'InOutQuart',
    'OutInQuart',
    'InQuint',
    'OutQuint',
    'InOutQuint',
    'OutInQuint',
    'InExpo',
    'OutExpo',
    'InOutExpo',
    'OutInExpo',
    'InCirc',
    'OutCirc',
    'InOutCirc',
    'OutInCirc',
    'InBack',
    'OutBack',
    'InOutBack',
    'OutInBack',
    'InElastic',
    'OutElastic',
    'InOutElastic',
    'OutInElastic',
]

export const vcToLevelData = (vc: VoezChart): LevelData => {
    const entities: LevelDataEntity[] = [
        {
            archetype: 'Initialization',
            data: [],
        },
        {
            archetype: 'InputManager',
            data: [],
        },
        {
            archetype: 'Stage',
            data: [],
        },
    ]

    const add = (
        entity: Omit<LevelDataEntity, 'data'> & { data: Record<string, number | string> },
    ) =>
        entities.push({
            ...entity,
            data: Object.entries(entity.data).map(([k, v]) =>
                typeof v === 'number' ? { name: k, value: v } : { name: k, ref: v },
            ),
        })

    let id = 0
    const next = () => `${id++}`

    for (const bpm of vc.bpms) {
        add({
            archetype: EngineArchetypeName.BpmChange,
            data: {
                [EngineArchetypeDataName.Beat]: bpm.beat,
                [EngineArchetypeDataName.Bpm]: bpm.bpm,
            },
        })
    }

    for (const track of vc.tracks) {
        const ref = next()

        add({
            ref,
            archetype: 'Track',
            data: {
                x: track.x,
                w: track.w,
                c: track.c,
                startBeat: track.startBeat,
                endBeat: track.endBeat,
                animateStart: +track.animateStart,
            },
        })

        const addCommand = (archetype: string, command: TrackCommand) =>
            add({
                archetype,
                data: {
                    trackRef: ref,
                    startBeat: command.startBeat,
                    startValue: command.startValue,
                    endBeat: command.endBeat,
                    endValue: command.endValue,
                    ease: ease.indexOf(command.ease),
                },
            })

        for (const command of track.moveCommands) {
            addCommand('TrackMoveCommand', command)
        }

        for (const command of track.scaleCommands) {
            addCommand('TrackScaleCommand', command)
        }

        for (const command of track.colorCommands) {
            addCommand('TrackColorCommand', command)
        }

        for (const note of track.notes) {
            switch (note.type) {
                case 'tap':
                    add({
                        archetype: 'TapNote',
                        data: {
                            trackRef: ref,
                            [EngineArchetypeDataName.Beat]: note.beat,
                        },
                    })
                    break

                case 'slide':
                    add({
                        archetype: 'SlideNote',
                        data: {
                            trackRef: ref,
                            [EngineArchetypeDataName.Beat]: note.beat,
                        },
                    })
                    break

                case 'flick':
                    add({
                        archetype: 'FlickNote',
                        data: {
                            trackRef: ref,
                            [EngineArchetypeDataName.Beat]: note.beat,
                            direction: note.direction === 'left' ? -1 : 1,
                        },
                    })
                    break

                case 'hold': {
                    const headRef = next()
                    const tailRef = next()

                    add({
                        ref: headRef,
                        archetype: 'HoldStartNote',
                        data: {
                            trackRef: ref,
                            [EngineArchetypeDataName.Beat]: note.beat,
                        },
                    })

                    add({
                        ref: tailRef,
                        archetype: 'HoldEndNote',
                        data: {
                            trackRef: ref,
                            [EngineArchetypeDataName.Beat]: note.toBeat,
                            headRef,
                        },
                    })

                    add({
                        archetype: 'HoldConnector',
                        data: {
                            headRef,
                            tailRef,
                        },
                    })
                    break
                }
            }
        }
    }

    return {
        bgmOffset: vc.offset,
        entities,
    }
}
