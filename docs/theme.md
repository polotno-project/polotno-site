---
title: Theming and UI styles
---

Styling Polotno Design Editor to match your design.

Most of Polotno UI is made with [Blueprint](https://blueprintjs.com/) framework. If you want to change appearance of Polotno UI, you have to overwrite blueprint classes and use its methods.

### How to enable dark theme?

To enable dark-mode, you just need to add `bp5-dark` class to any editor container.

```html
<body class="bp5-dark">
  <div id="container"></div>
</body>
```

### How to change styles of side panel and toolbar?

The simplest way is to use good old CSS styles. You can inspect full DOM tree find these class names. For convenient flow some internal polotno components has special polotno selectors. You can use them too, to have more specific style selectors.

```css
/* overwrite colors for side-panel tabs */
.bp5-dark .polotno-side-tabs-container .polotno-side-panel-tab:hover,
.bp5-dark .polotno-side-tabs-container .polotno-side-panel-tab.active {
  background-color: #c8c52d;
  color: white;
}

/* change hover style of all buttons */
.bp5-dark .bp5-button:not([class*='bp5-intent-']):hover {
  background-color: #c8c52d;
}
```

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-theme" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-theme?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
