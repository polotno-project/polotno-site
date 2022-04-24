---
title: API for automated image generation
---

If you are interested to use it on production, please contact anton@lavrton.com.
You will need to have "Enterprise plan" to call this API.

With Polotno Server API you can generate images from JSON data. You can use it to generate image variations on bulk without making your own backend infrastructure.

## How it looks like?

```js
const req = await fetch('https://api.polotno.com/api/render?KEY=YOUR_API_KEY', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // polotno json from store.toJSON()
    design: json,
    // optional output format for export
    outputFormat: 'dataURL',
    // optional export options for store.toDataURL() method
    exportOptions: {},
  }),
});

const { url } = await req.json();

document.getElementById('image').src = url;
```

## Demo?

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

## Options

### `design`

`design` - JSON data from polotno export `store.toJSON()`. Remember that you can generate such JSON on the fly on your backend. For example replace text on some elements dynamically.

### `outputFormat`

`outputFormat` - defines response format. Possible values are: `dataURL` (default), `url` and `file`.

If you use `dataURL` or `url`, API will return json `{ url: '...' }` where `url` is the generated image url.

`file` format will return file buffer. You can save it directly on the backend.

**Note: Cloud API has 5mb limit for its payload!**. So it will be not able to return large data in `dataURL` or `file` format. You can use `url` format instead.

**Images generated using `url` format has expiration time of 24 hour.** After that time, access to the file is not guaranteed. If you want to keep file, please save it on your backend.

### `format`

File format of generated result. Possible values are: `png` (default), `jpeg`, `pdf`.

### `exportOptions`

Additional options to pass into export function. For more details see [store.toDataURL()](https://polotno.com/docs/store-overview/#await-storetodataurl) and [store.toPDFDataURL()](https://polotno.com/docs/store-overview/#async-storetopdfdataurl).
