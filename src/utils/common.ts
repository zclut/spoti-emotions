import GLOBE from 'vanta/dist/vanta.globe.min'
import HALO from 'vanta/dist/vanta.halo.min'
import * as THREE from "three"


export const createBackground = (id: string) => {
    HALO({
        el: id,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 600,
        minWidth: 600
    })
    return
}