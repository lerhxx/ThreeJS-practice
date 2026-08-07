import * as THREE from 'three';
import vertexShader from '../vertexShaders/32.glsl';
import fragmentShader from '../fragmentShaders/32.glsl';
import smokeUrl from '../../statics/smoke.png'

/** texture */
const textureLoader = new THREE.TextureLoader();
const perlineTexture = textureLoader.load(smokeUrl);
perlineTexture.wrapS = THREE.RepeatWrapping;
perlineTexture.wrapT = THREE.RepeatWrapping;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  // wireframe: true,
  depthWrite: false,
  side: THREE.DoubleSide,
  transparent: true,
  uniforms: {
    uTime: new THREE.Uniform(0),
    uPerlinTexture: new THREE.Uniform(perlineTexture)
  },
});

export default material;