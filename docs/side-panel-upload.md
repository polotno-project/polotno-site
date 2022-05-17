---
title: Upload panel
---

Default upload panel is very simplified. It can't keep uploaded images across user sessions. And it doesn't upload images to the backend, but instead injects images as base64 string directly into the design (it may drop performance a lot). It is very recommended to overwrite it with your own implementation.

## How to implement upload section?

`Upload` section may very work similar to [Images Section](/docs/side-panel-images). You just need to implement several API endpoints on your backend to allow:

1. Loading list of user images
2. Uploading new image
3. Deleting image

The example below doesn't use real server to implement this function. It just uses local storage to store images. But you can use it as a starting point.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-upload-section" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-upload-section?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
