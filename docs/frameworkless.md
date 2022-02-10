---
title: Polotno without JS frameworks
hide_table_of_contents: true
---

`Polotno` is designed to use with React framework.
If you don't need any customization, you can use special "frameworkless" version of `Polotno`.
You can add it with a simple scripts into the page.

```html
<!-- add styles -->
<link
  href="https://unpkg.com/@blueprintjs/icons@3/lib/css/blueprint-icons.css"
  rel="stylesheet"
/>
<link
  href="https://unpkg.com/@blueprintjs/core@3/lib/css/blueprint.css"
  rel="stylesheet"
/>
<link
  href="https://unpkg.com/@blueprintjs/popover2@0.13.0/lib/css/blueprint-popover2.css"
  rel="stylesheet"
/>
<!-- add polotno bundle -->
<script src="https://unpkg.com/polotno@latest/polotno.bundle.js"></script>
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
```
