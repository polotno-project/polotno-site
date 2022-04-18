---
title: Without JS frameworks
hide_table_of_contents: true
---

`Polotno` is designed to use with React framework.

But if you don't need any customization, you can use special "frameworkless" version of `Polotno`.
You can add it with a simple scripts into the page.

```html
<!-- add styles -->
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
<!-- add polotno bundle -->
<script src="https://unpkg.com/polotno@latest/polotno.bundle.js"></script>

<!-- set styles for the editor -->
<style>
  body {
    padding: 0;
    margin: 0;
  }
  #container {
    width: 100vw;
    height: 100vh;
  }
</style>

<!-- create container for editor -->
<div id="container"></div>
<!-- init the editor -->
<script>
  createPolotnoApp({
    // this is a demo key just for that project
    // (!) please don't use it in your projects
    // to create your own API key please go here: https://polotno.dev/cabinet
    key: 'nFA5H9elEytDyPyvKL7T',
    // you can hide back-link on a paid licence
    // but it will be good if you can keep it for Polotno project support
    showCredit: true,
    container: document.getElementById('container'),
  });
</script>
```

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-frameworkless?fontsize=11&hidenavigation=1&theme=dark&view=preview"
    style={{
      width: '100%',
      height: '700px',
      border: 0,
      overflow: 'hidden',
    }}
    title="Polotno demo"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-downloads"
  ></iframe>
