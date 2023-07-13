---
title: Text overflow
hide_table_of_contents: true
---

**Warning: this settings is unstable and may change in the future.**

By default, text objects in Polotno will increase their height when you type more text, change text via API, or set bigger font size.

You can change this behavior:

```js
import { unstable_setTextOverflow } from 'polotno/config';

// default, change height of the text object when it overflow defined with/height
unstable_setTextOverflow('resize');

// add ... at the end of the text when it overflow defined with/height
unstable_setTextOverflow('ellipsis');

// reduce font size to fit text in the defined width/height
// note, it will not increase font size back when there is more space
unstable_setTextOverflow('change-font-size');
```

You can use this settings in combination with [`unstable_setTextVerticalResizeEnabled`](/docs/vertical-text-resize).

You can set this property once, globally, or you can change in realtime based on current elements selection.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-text-overflow" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-text-overflow?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
