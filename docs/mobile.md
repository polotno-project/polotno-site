---
title: Mobile support
---

### Does Polotno support mobile and touch devices?

Yes, You can use it on mobile and touch devices to create beautiful designs there. On smaller screens polotno will automatically change layout for better experience.

![Mobile Device example](/img/mobile.png)

> Note: Polotno SDK is designed to work for web environment. Polotno is not designed for native mobile apps. But you can use it in your mobile app if you have a webview there.

### How to toggle mobile mode on large screens?

In some cases you may want to force compact/mobile view on large screen. For example if you want to display the editor on the side. I that case you should add `polotno-mobile` class for any parent container of Polotno editor. E.g. you can add it into `body` tag.

```html
<body class="polotno-mobile">
  <div id="root"></div>
</body>
```

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-mobile" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-mobile?fontsize=14&hidenavigation=1&theme=dark&view=preview"
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
