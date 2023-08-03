import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { vcToLevelData } from './vc/convert.cjs'
export * from './vc/index.cjs'
export { vsToVC } from './vs/convert.cjs'
export * from './vs/index.cjs'

export const version = '1.0.2'

export const engineInfo = {
    name: 'voez',
    version: 9,
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
} as const satisfies Partial<EngineInfo>

export const engineConfiguration = new Resource('EngineConfiguration')
export const enginePlayData = new Resource('EnginePlayData')
export const engineThumbnail = new Resource('thumbnail.png')
