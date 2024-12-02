import { DatabaseEngineItem } from '@sonolus/core'

export { vcToLevelData } from './vc/convert.cjs'
export * from './vc/index.cjs'
export { vsToVC } from './vs/convert.cjs'
export * from './vs/index.cjs'

export const version = '1.5.0'

export const databaseEngineItem = {
    name: 'voez',
    version: 12,
    title: {
        en: 'VOEZ',
    },
    subtitle: {
        en: 'VOEZ',
    },
    author: {
        en: 'Burrito',
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
