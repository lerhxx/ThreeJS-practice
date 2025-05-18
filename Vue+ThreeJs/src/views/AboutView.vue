<template>
  <canvas class="canvas" ref="canvasRef" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Demo1 from '../scenes/demo1';
import { cube } from '../TEngine/TObject';
import{ directionalLight } from '../TEngine/TLight';

const canvasRef = ref(null);

onMounted(() => {
  const scene1 = new Demo1(canvasRef);
  scene1.addObjects([ cube ]);
  scene1.addLights([ directionalLight ]);
  // scene1.render.call(scene1);
})

</script>

<style>
@media (min-width: 1024px) {
  .canvas {
    display: block;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
