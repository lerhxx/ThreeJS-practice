import { DirectionalLight } from 'three';

export const directionalLight = new DirectionalLight({
    color: 0xFFFFFF, intensity: 3
});
directionalLight.position.set(-1, 2, 4);
