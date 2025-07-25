import { DatabaseEngineItem } from '@sonolus/core'

export { vcToLevelData } from './vc/convert.js'
export * from './vc/index.js'
export { vsToVC } from './vs/convert.js'
export * from './vs/index.js'

export const version = '1.6.0'

export const databaseEngineItem = {
    name: 'voez',
    version: 13,
    title: {
        en: 'VOEZ',
    },
    subtitle: {
        en: 'VOEZ',
    },
    author: {
        en: 'Burrito#1000',
    },
    description: {
        en: [
            'A recreation of VOEZ engine in Sonolus.',
            '',
            'Version:',
            version,
            '',
            'GitHub Repository:',
            'https://github.com/NonSpicyBurrito/sonolus-voez-engine',
        ].join('\n'),
    },
} as const satisfies Partial<DatabaseEngineItem>
