---
title: QR codes
hide_table_of_contents: true
---

## How do display and change QR codes?

There are several tools that will help you to display and change QR codes in Polotno Editor.

1. Using [qrcode](https://www.npmjs.com/package/qrcode) (or other similar library) we can generate SVG image of QR code.
2. With `svg` element you can show generated SVG image on the canvas.
3. We can use `custom` attribute of `svg` shape to save any additional data. We can use it to store QR code data string for future reference.

_Instructions: try to change content of selected QR code. Try to deselect element to create new QR codes._

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-qr-codes" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-qr-codes?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
