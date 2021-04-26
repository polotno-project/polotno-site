---
title: Integration with Vue framework.
---

`Polotno` is designed to work with `React` framework. Most of the customization demos on the site are made for a `React` codebase.

### Is it possible to use `polotno` with `Vue.js` framework?

Demo: https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-and-vue?file=/src/App.vue

If you don't need much customizations you can make your own application with `Vue.js` framework and embed `polotno` into it. You can use [store API](/docs/store-overview) to interact with the editor. Also you can

```js
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
    <div id="app"></div>
  </div>
</template>

<script>
import { createDemoApp } from "polotno/polotno-app";

export default {
  name: "App",
  mounted() {
    const { store } = createDemoApp({
      container: document.getElementById("app"),
      key: "YOUR_API_KEY", // you can create it here: https://polotno.dev/cabinet/
    });
  },
};
</script>

<style global>
#app {
  width: 100vw;
  height: 100vh;
}
body {
  padding: 0;
  margin: 0;
}
</style>
```
