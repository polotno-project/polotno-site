<script setup>
import { createEditor } from '../../editor';
import {  onMounted } from 'vue'


onMounted(() => {
  createEditor({
    container: document.getElementById('editor'),
  })
})

</script>

<template>
<link
    href="https://unpkg.com/@blueprintjs/icons@4/lib/css/blueprint-icons.css"
    rel="stylesheet"
  />
  <link
    href="https://unpkg.com/@blueprintjs/core@4/lib/css/blueprint.css"
    rel="stylesheet"
  />
  <link
    href="https://unpkg.com/@blueprintjs/popover2@1/lib/css/blueprint-popover2.css"
    rel="stylesheet"
  />
 <div id="editor"></div>
  
</template>

<style scoped>
#editor {
  margin: 5%;
  width: 90%;
  height: 80vh;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}
</style>
