import { EngineInfo } from 'sonolus-core'
import { Resource } from './Resource.cjs'

export { vcToLevelData } from './vc/convert.cjs'
export { vsToVC } from './vs/convert.cjs'

export const version = '1.0.0'

export const engineInfo = {
    name: 'voez',
    version: 8,
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
export const engineData = new Resource('EngineData')
export const engineThumbnail = new Resource('thumbnail.png')
