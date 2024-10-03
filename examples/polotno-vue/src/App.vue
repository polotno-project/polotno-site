<template>
  <Observer>
    <div class="header">
      <div>
        This header is controlled by Vue. It can be used to display the number
        of pages: {{ store.pages.length }}
      </div>
      <button @click="store.addPage">Add page</button>
    </div>
    <div id="editor"></div>
  </Observer>
</template>

<script setup>
import * as ReactDOM from 'react-dom/client';
import * as React from 'react';
import { App, store } from './components/editor';
import { Observer } from 'mobx-vue-lite';

import { onMounted, onUnmounted } from 'vue';

let root;
onMounted(() => {
  root = ReactDOM.createRoot(document.getElementById('editor'));
  root.render(React.createElement(App));
});

onUnmounted(() => {
  root?.unmount();
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.header {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
