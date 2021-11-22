---
title: API for automated image generation
---

If you are interested to use it on production, please contact anton@lavrton.com.
You will need to have a special Server Side Rendering license to use it.

With Polotno Server API you can generate images from JSON data. You can use it to generate image variations on bulk without making your own backend infrastructure.

```js
const req = await fetch('api.polotno.dev/api/render?KEY=YOUR_API_KEY', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // polotno json from store.toJSON()
    design: json,
    // optional output format for export
    // possible values are 'file' and 'json'
    outputFormat: 'json',
    // optional export options for store.toDataURL() method
    exportOptions: {},
  }),
});

const { url } = await req.json();

document.getElementById('image').src = url;
```

Demo:

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/cloud-render?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
