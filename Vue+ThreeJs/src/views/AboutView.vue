<template>
  <div class="canvas" ref="canvasContainerRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Demo1 from '../scenes/demo1';
import { cube } from '../TEngine/TObject';

const canvasContainerRef = ref(null);

onMounted(() => {
  const scene1 = new Demo1(canvasContainerRef);
  scene1.addObjects([ cube ]);
  scene1.render();
})

</script>

<style>
@media (min-width: 1024px) {
  .canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
