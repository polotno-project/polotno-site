---
title: Cloud Render API
---

> If you are interested to use it on production, please contact _anton at polotno.com_.
> You will need to have "Enterprise plan" to call this API.

## What is Cloud Render API?

Using Polotno SDK you can generate images directly on the client. But sometimes you need to generate images on the backend. For example if you want to generate 1000 images with different text on it or if you want to simply offload rendering work from the client.

You can render images on the backend using [Polotno Node.js SDK](/docs/server-side). But it requires you to have your own backend infrastructure.

Polotno Cloud Render API allows you to generate images on the cloud without any backend infrastructure. You can use it to generate images on the fly or to generate images in bulk.

![Cloud Render Scheme](/img/cloud-render-scheme.jpg)

## How does it look?

```js
const req = await fetch('https://api.polotno.com/api/render?KEY=YOUR_API_KEY', {
  method: 'POST',
  headers: {
    // it is important to set a json content type
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

import CloudRenderDemo from '../cloud-render-demo';

<CloudRenderDemo />

<!-- <iframe
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
  ></iframe> -->

## Options

When you send request to the API, you need to pass JSON into request's body.

```json
{
  "design": {},
  "outputFormat": "dataURL",
  "exportOptions": {}
}
```

### `design`

`design` - JSON data from polotno export `store.toJSON()`. Remember that you can generate such JSON on the fly on your backend. For example replace text on some elements dynamically.

### `outputFormat`

`outputFormat` - defines response format. Possible values are: `dataURL` (default), `url` and `file`.

If you use `dataURL` or `url`, API will return json `{ url: '...' }` where `url` is the generated image url.

`file` format will return file buffer. You can save it directly on the backend.

**Note: Cloud API has 5mb limit for its payload!**. So it will be not able to return large data in `dataURL` or `file` format. You can use `url` format instead.

**Images generated using `url` format has expiration time of 24 hour. After that time, access to the file is not guaranteed. If you want to keep file, please save it on your backend.**

### `format`

File format of generated result. Possible values are: `png` (default), `jpeg`, `pdf`.

### `exportOptions`

Additional options to pass into export function. For more details see [store.toDataURL()](https://polotno.com/docs/store-overview/#await-storetodataurl) and [store.toPDFDataURL()](https://polotno.com/docs/store-overview/#async-storetopdfdataurl).

```json
{
  "design": {},
  "exportOptions": {
    "pixelRatio": 2
  }
}
```

### `htmlTextRenderEnabled`

Optional boolean value to enable [Rich Text Feature](/docs/rich-text/)

```json
{
  "design": {},
  "htmlTextRenderEnabled": true
}
```

### `textVerticalResizeEnabled`

Optional boolean value to enable [Vertically Resized Text](/docs/vertical-text-resize/)

```json
{
  "design": {},
  "textVerticalResizeEnabled": true
}
```
