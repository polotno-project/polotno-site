<template>
  <div>
    <link
      href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css"
      rel="stylesheet"
    />
    <link
      href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css"
      rel="stylesheet"
    />
    <link
      href="https://unpkg.com/@blueprintjs/popover2@0.11.0/lib/css/blueprint-popover2.css"
      rel="stylesheet"
    />
    <!-- <div v-text="store.pages[0].children.length"></div> -->
    <div id="polotno"></div>
  </div>
</template>
<script>
import { createDemoApp } from "polotno/polotno-app";
// import { observer } from "mobx-vue";

export default {
  name: "App",
  data() {
    return {
      store: null,
    };
  },
  mounted() {
    const { store } = createDemoApp({
      container: document.getElementById("polotno"),
      key: "YOUR_API_KEY", // you can create it here: https://polotno.dev/cabinet/
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
