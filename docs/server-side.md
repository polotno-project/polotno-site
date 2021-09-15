---
title: Server-side Image generation for Polotno
---

### Is it possible to generate images from polotno JSON on the backend?

Yes. There is [polotno-node package](https://www.npmjs.com/package/polotno-node) for such a use case.

Using `polotno-node` you can use most of [Polotno Store API](/docs/store-overview). The common usage is image export from Polotno JSON:

```js
const fs = require('fs');
// import polotno-node API
const { createInstance } = require('polotno-node');

async function run() {
  // create working instance
  const instance = await createInstance({
    // to create your own API key please go here: https://polotno.dev/cabinet
    key: 'nFA5H9elEytDyPyvKL7T',
  });

  // load sample json
  const json = JSON.parse(fs.readFileSync('polotno.json'));
  // here you can manipulate JSON somehow manually
  // for example replace some images or change text

  // then we can convert json into image
  const imageBase64 = await instance.jsonToImageBase64(json); // by default it will be png image
  // write image into local file
  fs.writeFileSync('out.png', imageBase64, 'base64');

  // also we can export design into lower size
  // and change image type
  const jpegImage = await instance.jsonToImageBase64(json, {
    pixelRatio: 0.5, // make image twice smaller
    mimeType: 'image/jpeg',
  });
  fs.writeFileSync('out.jpg', jpegImage, 'base64');

  // close instance
  instance.close();
}

run();
```
