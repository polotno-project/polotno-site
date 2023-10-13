<template>
  <div>
    <link
      href="https://unpkg.com/@blueprintjs/core@5/lib/css/blueprint.css"
      rel="stylesheet"
    />
    <!-- <div v-text="store.pages[0].children.length"></div> -->
    <div id="polotno"></div>
  </div>
</template>
<script>
import { createDemoApp } from 'polotno/polotno-app';
// import { observer } from "mobx-vue";

export default {
  name: 'App',
  data() {
    return {
      store: null,
    };
  },
  mounted() {
    const { store } = createDemoApp({
      container: document.getElementById('polotno'),
      key: 'YOUR_API_KEY', // you can create it here: https://polotno.com/cabinet/
      // you can hide back-link on a paid license
      // but it will be good if you can keep it for Polotno project support
      showCredit: true,
    });
    this.store = store;
  },
};
</script>

<style global>
#polotno {
  width: 100vw;
  height: 100vh;
}
body {
  padding: 0;
  margin: 0;
}
</style>
