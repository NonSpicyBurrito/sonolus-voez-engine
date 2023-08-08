import { options } from '../../../configuration/options.mjs'
import { buckets } from '../../buckets.mjs'
import { effect, getScheduleSFXTime } from '../../effect.mjs'
import { noteLayout } from '../../note.mjs'
import { effectLayout, particle } from '../../particle.mjs'
import { skin } from '../../skin.mjs'
import { windows } from '../../windows.mjs'
import { archetypes } from '../index.mjs'
import { Note } from './Note.mjs'

export class HoldEndNote extends Note {
    holdData = this.defineData({
        headRef: { name: 'headRef', type: Number },
    })

    sprites = {
        note: skin.sprites.holdEndNote,
    }

    windows = windows.holdEndNote

    bucket = buckets.holdEndNote

    headTime = this.entityMemory(Number)

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)

    holdEffectInstanceId = this.entityMemory(ParticleEffectInstanceId)

    preprocess() {
        super.preprocess()

        this.headTime = bpmChanges.at(this.headData.beat).time
        this.scheduleSFXTime = getScheduleSFXTime(this.headTime)

        this.spawnTime = Math.min(this.visualTime.min, this.scheduleSFXTime)
    }

    initialize() {
        super.initialize()

        if (options.autoplay) {
            this.result.judgment = Judgment.Perfect

            this.result.bucket.index = this.bucket.index
        } else {
            this.result.accuracy = this.windows.good.min
        }
    }

    updateParallel() {
        this.handleInput()

        if (options.autoplay && this.shouldHoldEffect && time.now >= this.headTime) {
            if (!this.holdEffectInstanceId) this.spawnHoldEffect()

            this.moveHoldEffect()
        }

        super.updateParallel()
    }

    terminate() {
        if (!options.autoplay) return

        if (this.shouldHoldEffect && this.holdEffectInstanceId) this.destroyHoldEffect()
    }

    get headInfo() {
        return entityInfos.get(this.holdData.headRef)
    }

    get headData() {
        return archetypes.HoldStartNote.data.get(this.holdData.headRef)
    }

    get shouldScheduleSFX() {
        return (
            options.sfxEnabled && effect.clips.hold.exists && (options.autoplay || options.autoSFX)
        )
    }

    get shouldPlaySFX() {
        return (
            options.sfxEnabled && effect.clips.hold.exists && !options.autoplay && !options.autoSFX
        )
    }

    get shouldHoldEffect() {
        return options.noteEffectEnabled && particle.effects.hold.exists
    }

    scheduleSFX() {
        super.scheduleSFX()

        const id = effect.clips.hold.scheduleLoop(this.headTime)
        effect.clips.scheduleStopLoop(id, this.targetTime)
    }

    playSFX() {
        this.sfxInstanceId = effect.clips.hold.loop()
    }

    stopSFX() {
        effect.clips.stopLoop(this.sfxInstanceId)
    }

    spawnHoldEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        this.holdEffectInstanceId = particle.effects.hold.spawn(layout, 0.5, true)
    }

    moveHoldEffect() {
        const layout = effectLayout(this.trackSharedMemory.x)

        particle.effects.move(this.holdEffectInstanceId, layout)
    }

    destroyHoldEffect() {
        particle.effects.destroy(this.holdEffectInstanceId)
    }

    handleInput() {
        if (options.autoplay) return

        if (this.headInfo.state !== EntityState.Despawned) return

        if (this.trackSharedMemory.isActive && time.now < this.inputTime.max) {
            if (this.shouldPlaySFX && !this.sfxInstanceId) this.playSFX()

            if (this.shouldHoldEffect) {
                if (!this.holdEffectInstanceId) this.spawnHoldEffect()

                this.moveHoldEffect()
            }

            return
        }

        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()
        if (this.shouldHoldEffect && this.holdEffectInstanceId) this.destroyHoldEffect()
        this.despawn = true

        if (time.now < this.inputTime.min) return

        const hitTime = Math.min(time.now - input.offset, this.targetTime)

        this.result.judgment = input.judge(hitTime, this.targetTime, this.windows)
        this.result.accuracy = hitTime - this.targetTime

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000
    }

    render() {
        super.render()

        this.sprites.note.draw(noteLayout().translate(this.x, this.y), this.z, 1)
    }
}
