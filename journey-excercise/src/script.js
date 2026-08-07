import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'
import material from './materials/27.js';

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

// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);



// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

/** particles */
// const particlesGeometry = new THREE.BufferGeometry();
// const count = 5000;

// const positions = new Float32Array(count * 3);

// for(let i = 0; i < count * 3; ++i) {
//   positions[i] = (Math.random() - 0.5) * 10;
// }

// particlesGeometry.setAttribute(
//   'position',
//   new THREE.BufferAttribute(positions, 3),
// )

// const particlesMaterial = new THREE.PointsMaterial();
// particlesMaterial.size = 0.02;
// particlesMaterial.sizeAttenuation = true;
// particlesMaterial.color = new THREE.Color('pink')

// const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);

/** galaxy */
// const parameters = {};
// parameters.count = 10000;
// parameters.size = 0.02;

// let geometry = null;
// // let material = null;
// let points = null;

// const generateGalaxy = () => {
//   if (points !== null) {
//     geometry.dispose();
//     material.dispose();
//     scene.remove(points);
//   }

//   geometry = new THREE.BufferGeometry();
//   const positions = new Float32Array(parameters.count * 3);

//   for (let i = 0; i < parameters.count *3; ++i) {
//     const i3 = i * 3;

//     positions[i3 + 0] = Math.random();
//     positions[i3 + 1] = Math.random();
//     positions[i3 + 2] = Math.random();
//   }

//   geometry.setAttribute(
//     'position',
//     new THREE.BufferAttribute(positions, 3)
//   );


//   material = new THREE.PointsMaterial({
//     size: parameters.size,
//     sizeAttenuation: true,
//     depthWrite: false,
//     blending: THREE.AdditiveBlending
//   });


//   points = new THREE.Points(geometry, material);
//   scene.add(points)
// };
// generateGalaxy();

// gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
// gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy);


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