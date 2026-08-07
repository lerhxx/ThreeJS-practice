import * as THREE from 'three';
import vertexShader from '../vertexShaders/vertex27.glsl';
import fragmentShader from '../fragmentShaders/fragment27.glsl';

const material = new THREE.RawShaderMaterial({
  vertexShader,
  fragmentShader,
});

export default material;