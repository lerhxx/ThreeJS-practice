import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

export default class Demo1 {
    scene = null;
    camera = null;
    renderer = null;
    objects = [];
    canvas = null;

    constructor(canvasRef) {
        this.initScene(canvasRef);
        requestAnimationFrame(this.render.bind(this));
    }

    initScene(canvasRef) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(
            75,
            2,
            0.1,
            1000,
        );
        this.camera.position.z = 5;

        this.canvas = canvasRef.value;
        this.renderer = new WebGLRenderer({ antialias: true, canvas: canvasRef.value });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight, false);
        // canvasContainerRef.value.appendChild(this.renderer.domElement);
    }

    addObjects(objects) {
        objects.forEach(obj => {
            this.scene.add(obj);
            this.objects.push(obj);
        })
    }

    addLights(lights) {
        lights.forEach(light => {
            this.scene.add(light);
        })
    }

    render(time) {
        time *= 0.001;
        this.objects.forEach(obj => {
            obj.rotation.x = time;
            obj.rotation.y = time;
        })

        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        // this.camera.updateProjectionMatrix();

        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(this.render.bind(this));

    }
}