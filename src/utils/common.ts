import HALO from 'vanta/dist/vanta.halo.min'
import FOG from 'vanta/dist/vanta.fog.min'
import CELLS from 'vanta/dist/vanta.cells.min'
import * as THREE from "three"

let effect = null

const COLORS = [0x1e1e70, 0x690b9d, 0x14c3fc, 0x692169, 0x117d1b, 0xca0c65]
const BACKGROUNDS = [HALO, FOG, CELLS]
const CONFIG = (color: number) => [
    {
        baseColor: 0x134ac3, // Color of the halo
        backgroundColor: color,  // Background color
        size: 1.5,
        amplitudeFactor: 3,
        xOffset: -0.40,
        yOffset: -0.55,
    },
    {
        midtoneColor: color,  // Color of the fog
        highlightColor: 0x0,  // Rest of the fog black
        lowlightColor: 0x929296,
        baseColor: 0x0,
        blurFactor: 0.73,
        speed: 4.10,
        zoom: 2.80
    },
    {
        color1: color,  // Color of the cells
        color2: 0x0, // Background color
        scale: 1.00,
        size: 1.5,
        speed: 3
    }
]

export const createBackground = (id: string, currentSlide: number = 0) => {
    if (effect) {
        effect.destroy()
    }
    // Random background effect
    const random = currentSlide % BACKGROUNDS.length
    const color = COLORS[currentSlide % COLORS.length]

    const effectConfig = {
        el: id,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        ...CONFIG(color)[random]
    }

    effect = BACKGROUNDS[random](effectConfig)
}
