import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'
import material from '../materials/27.js';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1);
// scene.add(mesh);

const gui = new dat.GUI({ width: 400 })

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
camera.position.z = 3
// camera.position.y = 1;
// camera.position.x = 1;
scene.add(camera);

const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * render
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );

function rerender() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rerender);
}
rerender();