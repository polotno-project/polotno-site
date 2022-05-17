---
title: Rich text
hide_table_of_contents: true
---

**THIS PAGE IS ABOUT EXPERIMENTAL FEATURES OF POLOTNO!**

**Please use it carefully. Watch [changelog](/changelog) for any changes! And report about any bugs.**

By default, `Polotno` can't render rich text elements. It means you can't style part of the text. Whole `text` element must have the same style, color, font, etc.

### How to enabled rich text support?

You can enabled rich text support with this.

```js
import { unstable_useHtmlTextRender } from 'polotno/config';

unstable_useHtmlTextRender(true);
```

When you enable "html renderer", polotno will use very different rendering logic for text elements. Rich text may drop performance of your application if you have many text elements. Please report about any issues you have.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-rich-text" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-rich-text?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
