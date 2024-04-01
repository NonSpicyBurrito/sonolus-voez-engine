import {
    EngineArchetypeDataName,
    EngineArchetypeName,
    LevelData,
    LevelDataEntity,
} from 'sonolus-core'
import { VC, VCTrackCommand } from './index.cjs'

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

export const vcToLevelData = (vc: VC, offset = 0): LevelData => {
    const entities: LevelDataEntity[] = [
        {
            archetype: 'Initialization',
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
        const data: Record<string, number | string> = {
            x: track.x,
            w: track.w,
            c: track.c,
            startBeat: track.startBeat,
            endBeat: track.endBeat,
            animateStart: +track.animateStart,
        }

        const addCommands = (commands: VCTrackCommand[], archetype: string, dataName: string) => {
            const entities = commands.map((command) => ({
                ref: next(),
                archetype,
                data: {
                    trackRef: ref,
                    startBeat: command.startBeat,
                    startValue: command.startValue,
                    endBeat: command.endBeat,
                    endValue: command.endValue,
                    ease: ease.indexOf(command.ease),
                },
            }))

            if (entities.length) {
                data[dataName] = entities[0].ref
            }

            for (const [index, entity] of entities.entries()) {
                if (index === entities.length - 1) {
                    add(entity)
                } else {
                    add({
                        ...entity,
                        data: {
                            ...entity.data,
                            nextRef: entities[index + 1].ref,
                        },
                    })
                }
            }
        }

        addCommands(track.moveCommands, 'TrackMoveCommand', 'moveRef')
        addCommands(track.scaleCommands, 'TrackScaleCommand', 'scaleRef')
        addCommands(track.colorCommands, 'TrackColorCommand', 'colorRef')

        add({
            ref,
            archetype: 'Track',
            data,
        })

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
        bgmOffset: offset,
        entities,
    }
}
