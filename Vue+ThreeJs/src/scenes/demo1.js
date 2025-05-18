import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export default class Demo1 {
    scene = null;
    camera = null;
    renderer = null;
    objects = [];

    constructor(canvasContainerRef) {
        this.initScene(canvasContainerRef);
    }

    initScene(canvasContainerRef) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000,
        );
        this.camera.position.z = 5;

        this.renderer = new WebGLRenderer({ antialias: true });
        canvasContainerRef.value.appendChild(this.renderer.domElement);
    }

    addObjects(objects) {
        objects.forEach(obj => {
            // const index = this.objects.push(obj);
            this.scene.add(obj);
        })
    }

    render() {
        requestAnimationFrame(this.render);

        this.objects.forEach(obj => {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.01;
        })

        this.renderer.render(this.scene, this.camera);
    }
}