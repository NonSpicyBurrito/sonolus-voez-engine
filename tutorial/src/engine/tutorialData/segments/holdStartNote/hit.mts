import { connector } from '../../components/connector.mjs'
import { noteDisplay } from '../../components/noteDisplay.mjs'
import { effect } from '../../effect.mjs'
import { drawHand } from '../../instruction.mjs'
import { particle, playHitEffect, spawnHoldEffect } from '../../particle.mjs'

let sfxInstanceId = tutorialMemory(LoopedEffectClipInstanceId)
let effectInstanceId = tutorialMemory(ParticleEffectInstanceId)

export const holdStartNoteHit = {
    enter() {
        connector.showFrozen()
        noteDisplay.showFrozen('holdStart')

        effect.clips.perfect.play(0)

        playHitEffect()

        sfxInstanceId = effect.clips.hold.loop()
        effectInstanceId = spawnHoldEffect()
    },

    update() {
        drawHand(Math.PI / 3, 0, 1)
    },

    exit() {
        connector.clear()
        noteDisplay.clear()

        effect.clips.stopLoop(sfxInstanceId)
        particle.effects.destroy(effectInstanceId)
    },
}
