---
title: Bar codes
hide_table_of_contents: true
---

## How do display and change Bar codes?

There are several tools that will help you to display and change Bar codes in Polotno Editor.

1. Using [JsBarcode](https://github.com/lindell/JsBarcode) (or other similar library) we can generate SVG image of bar code.
2. With `svg` element you can show generated SVG image on the canvas.
3. We can use `custom` attribute of `svg` shape to save any additional data. We can use it to store bar code data string for future reference.

_Instructions: try to change content of selected bar code. Try to deselect element to create new bar codes._

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-bar-codes" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-bar-codes?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
