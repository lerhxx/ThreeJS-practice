import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    })
);
