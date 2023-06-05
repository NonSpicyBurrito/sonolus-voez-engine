import { particle } from '../particle.mjs'
import { skin } from '../skin.mjs'
import { archetypes } from './index.mjs'
import { flick, scaledScreen } from './shared.mjs'

export class Initialization extends Archetype {
    preprocess() {
        const w = screen.w / 18
        const h = screen.h

        const b = Math.lerp(screen.t, screen.b, 2.5 / 3)
        const t = b + h

        scaledScreen.l = screen.l / w
        scaledScreen.r = screen.r / w
        scaledScreen.b = Math.unlerp(t, b, screen.b)
        scaledScreen.t = Math.unlerp(t, b, screen.t)

        scaledScreen.wToH = w / h

        flick.distance = w

        const transform = Mat.identity.scale(w, -h).translate(0, t)
        skin.transform.set(transform)
        particle.transform.set(transform)

        score.base.set({
            perfect: 1,
            great: 0.8,
            good: 0.5,
        })

        const gap = 0.05
        const uiRect = new Rect({
            l: screen.l + gap,
            r: screen.r - gap,
            b: screen.b + gap,
            t: screen.t - gap,
        })

        ui.menu.set({
            anchor: uiRect.lt,
            pivot: { x: 0, y: 1 },
            size: new Vec(0.15, 0.15).mul(ui.configuration.menu.scale),
            rotation: 0,
            alpha: ui.configuration.menu.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: true,
        })

        ui.metric.secondary.bar.set({
            anchor: uiRect.lt
                .add(new Vec(gap, 0))
                .add(new Vec(0.15, 0).mul(ui.configuration.menu.scale)),
            pivot: { x: 0, y: 1 },
            size: new Vec(0.55, 0.15).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.secondary.value.set({
            anchor: uiRect.lt
                .add(new Vec(gap, 0))
                .add(new Vec(0.15, 0).mul(ui.configuration.menu.scale))
                .add(new Vec(0.515, -0.035).mul(ui.configuration.metric.secondary.scale)),
            pivot: { x: 0, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.secondary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.secondary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.metric.primary.bar.set({
            anchor: uiRect.rt,
            pivot: { x: 1, y: 1 },
            size: new Vec(0.75, 0.15).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Left,
            background: true,
        })
        ui.metric.primary.value.set({
            anchor: uiRect.rt.sub(new Vec(0.035, 0.035).mul(ui.configuration.metric.primary.scale)),
            pivot: { x: 1, y: 1 },
            size: new Vec(0, 0.08).mul(ui.configuration.metric.primary.scale),
            rotation: 0,
            alpha: ui.configuration.metric.primary.alpha,
            horizontalAlign: HorizontalAlign.Right,
            background: false,
        })

        ui.combo.value.set({
            anchor: { x: 0, y: uiRect.t },
            pivot: { x: 0.5, y: 1 },
            size: new Vec(0, 0.15).mul(ui.configuration.combo.scale),
            rotation: 0,
            alpha: ui.configuration.combo.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        ui.judgment.set({
            anchor: { x: 0, y: uiRect.t },
            pivot: {
                x: 0.5,
                y: (2.5 * ui.configuration.combo.scale) / ui.configuration.judgment.scale + 1.5,
            },
            size: new Vec(0, 0.06).mul(ui.configuration.judgment.scale),
            rotation: 0,
            alpha: ui.configuration.judgment.alpha,
            horizontalAlign: HorizontalAlign.Center,
            background: false,
        })

        for (const archetype of Object.values(archetypes)) {
            if (!('globalPreprocess' in archetype)) continue

            archetype.globalPreprocess()
        }
    }

    spawnOrder() {
        return 0
    }

    updateSequential() {
        this.despawn = true
    }
}
