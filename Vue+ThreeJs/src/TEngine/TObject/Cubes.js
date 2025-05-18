import { BoxGeometry, MeshBasicMaterial, MeshPhongMaterial, Mesh } from "three";

export const cube = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshPhongMaterial({
        color: 0x44aa88,
        // wireframe: true,
    })
);
