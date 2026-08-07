import * as THREE from 'three';
import vertexShader from '../vertexShaders/34.glsl';
import fragmentShader from '../fragmentShaders/34.glsl';
import smokeUrl from '../../static/smoke.png'
import GUI from 'lil-gui';

/** texture */
const textureLoader = new THREE.TextureLoader();
const perlineTexture = textureLoader.load(smokeUrl);
perlineTexture.wrapS = THREE.RepeatWrapping;
perlineTexture.wrapT = THREE.RepeatWrapping;

const materialParameters = {
  color: '#78c1ff'
};

const gui = new GUI();
gui
  .addColor(materialParameters, 'color')
  .onChange(() => {
    material.uniforms.uColor.value.set(materialParameters.color)
  })

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  // transparent: true,
  // side: THREE.DoubleSide,
  // depthWrite: false,
  // blending: THREE.AdditiveBlending,
  uniforms: {
    uSize: new THREE.Uniform(10),
    // uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width, sizes.height))
  }
});

export default material;