import { resolve } from 'node:path'
import { EngineInfo } from 'sonolus-core'

export { vcToLevelData } from './vc/convert.cjs'
export * from './vc/index.cjs'
export { vsToVC } from './vs/convert.cjs'
export * from './vs/index.cjs'

export const version = '1.3.0'

export const engineInfo = {
    name: 'voez',
    version: 11,
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

export const engineConfigurationPath = resolve(__dirname, 'EngineConfiguration')
export const enginePlayDataPath = resolve(__dirname, 'EnginePlayData')
export const engineWatchDataPath = resolve(__dirname, 'EngineWatchData')
export const enginePreviewDataPath = resolve(__dirname, 'EnginePreviewData')
export const engineTutorialDataPath = resolve(__dirname, 'EngineTutorialData')
export const engineThumbnailPath = resolve(__dirname, 'thumbnail.png')
