---
title: Vertical text resize
hide_table_of_contents: true
---

**THIS PAGE IS ABOUT EXPERIMENTAL FEATURES OF POLOTNO!**

**Please use it carefully. Watch [changelog](/changelog) for any changes! And report about any bugs.**

By default, you can't change `height` of `text` elements. Texts are always updating its own height to fit its content.
However, in some application you may want to change this behavior. The most common example is ability to set bounding box for text elements and later replace text content dynamically on the backend.

When vertical resize is enabled you can also set vertical align from the text toolbar.

### How to enabled vertical text resize?

Use this:

```js
import { unstable_setTextVerticalResizeEnabled } from 'polotno/config';

unstable_setTextVerticalResizeEnabled(true);
```

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-vertical-text-resize" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-vertical-text-resize?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
