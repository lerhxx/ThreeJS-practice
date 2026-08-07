import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dat from 'dat.gui'
// import material from '../materials/34.js';
import { ThreeMFLoader, TTFLoader } from 'three/examples/jsm/Addons.js';
import vertexShader from '../vertexShaders/34.glsl';
import fragmentShader from '../fragmentShaders/34.glsl';
// import material from '../materials/34';
import { Sky } from 'three/addons/objects/Sky.js';

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
  height: window.innerHeight,
  pixelRatio: Math.min(window.devicePixelRatio, 2)
};
sizes.resolution = new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;
scene.add(camera);

const clock = new THREE.Clock();

const textureLoader = new THREE.TextureLoader();

let firwork = null;
let geometry = null;
let material = null;

// Fireworks
const textures = [
  textureLoader.load('/particles/1.png'),
  textureLoader.load('/particles/2.png'),
  textureLoader.load('/particles/3.png'),
  textureLoader.load('/particles/4.png'),
  textureLoader.load('/particles/5.png'),
  textureLoader.load('/particles/6.png'),
  textureLoader.load('/particles/7.png'),
  textureLoader.load('/particles/8.png'),
]

const createFirework = (count, position, size, texture, radius, color) => {
  const positionArray = new Float32Array(count * 3);
  const sizeArray = new Float32Array(count);
  const timeMultipliersArray = new Float32Array(count);

  for (let i = 0; i < count; ++i) {
    const i3 = i * 3;

    const spherical = new THREE.Spherical(
      radius * (0.75 + Math.random() * 0.25),
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2,
    );
    const position = new THREE.Vector3();
    position.setFromSpherical(spherical);

    positionArray[i3] = position.x;
    positionArray[i3 + 1] = position.y;
    positionArray[i3 + 2] = position.z;

    sizeArray[i] = Math.random();
    timeMultipliersArray[i] = 1 + Math.random();
  }

  geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3));
  geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1));
  geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1));

  texture.flipY = false;
  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(1),
      uResolution: new THREE.Uniform(sizes.resolution),
      uTexture: new THREE.Uniform(texture),
      uColor: new THREE.Uniform(color),
      uProgress: new THREE.Uniform(0),
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  material.uniforms.uSize.value = size * 0.15;

  firwork = new THREE.Points(geometry, material);
  firwork.position.copy(position);
  scene.add(firwork);

  // Destroy
  const destroy = () => {
    scene.remove(firwork);
    geometry.dispose();
    material.dispose();
  }

  // animate
  gsap.to(
    material.uniforms.uProgress,
    { value: 1, duration: 3, ease: 'linear', onComplete: destroy }
  )
}

// createFirework(100, new THREE.Vector3(), 0.5, textures[5], 1, new THREE.Color('#Baffff'));

const createRenderFirework = (e) => {
  const count = Math.round(400 + Math.random() * 1000);
  const position = new THREE.Vector3(Math.random() - 0.5, Math.random(), Math.random() - 0.5);
  const size = 0.1 + Math.random();
  const texture = textures[Math.floor(Math.random() * textures.length)];
  const radius = 0.8 + Math.random();
  const color = new THREE.Color();
  color.setHSL(Math.random(), 1, 0.7);

  createFirework(count, position, size, texture, radius, color);
}
// createRenderFirework();


/**
 * render
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio);
renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );

function rerender() {
  const elapsmedTime = clock.getElapsedTime();

  // material.uniforms.uTime.value = elapsmedTime;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rerender);
}
rerender();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  sizes.pixelRatio = Math.min(window.devicePixelRatio, 2);
  sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio);

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(sizes.pixelRatio);
})

window.addEventListener('click', createRenderFirework)
