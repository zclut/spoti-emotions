import GLOBE from 'vanta/dist/vanta.globe.min'
import HALO from 'vanta/dist/vanta.halo.min'
import FOG from 'vanta/dist/vanta.fog.min'
import * as THREE from "three"

let effect = null

const BACKGROUNDS = [GLOBE, HALO, FOG]

export const createBackground = (id: string, currentSlide: number = 0) => {
    if (effect) {
        effect.destroy()
    }

    // Random background effect
    const random = currentSlide % BACKGROUNDS.length
    effect = BACKGROUNDS[random]({
        el: id,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0,
        backgroundColor: 0x0
    })
}
