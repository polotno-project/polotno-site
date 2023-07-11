---
title: Animations
hide_table_of_contents: true
---

**At the current moment animation support is in alpha stage. Please report about any issues you have.**

By default, `Polotno` default UI is designed for static images. But you can enable animation support.

### How to enabled animations support?

Use this:

```js
import { unstable_setAnimationsEnabled } from 'polotno/config';

unstable_setAnimationsEnabled(true);
```

When you enable animations, polotno will add additional UI in the toolbar to change animation properties of the selected object.

You can preview animations and export animated scene as a GIF on a client side.

```js
store.play();
store.stop();
store.saveAsGIF();
```

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-animations" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-animations?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
