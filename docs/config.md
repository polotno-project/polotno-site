---
title: Polotno Editor configuration
---

### How to change Upload behavior?

The default [SidePanel Component](/docs/side-panel) has `Upload` tab to import local images into the project. By default `polotno` just converting local file into base64 string.
Resulted URL strings are using for `image` elements. Using base64 string may produce project with a large size, since images will be fully encoded inside JSON.

If you want to upload local images to your server you can do this:

```js
import { setUploadFunc } from 'polotno/config';

// define our upload function
// you have to write your own logic, that fits your API
async function upload(localFile) {
  const formData = new FormData();
  formData.append('files[]', localFile);
  const res = await fetch(yourServerURL, {
    method: 'POST',
    body: formData
  });
  const json = await res.json();
  const { url } = json;
  // return simple and short url
  return url;
}

// set new function
setUploadFunc(upload);
```

### How to change available fonts?

There are two ways to use fonts in `Polotno`: google fonts and font files.

If you want to change default Google fonts list you can do this:

```js
import { setGoogleFonts } from 'polotno/config';

// pass an array with google fonts names
setGoogleFonts(['Roboto']);
```

If you want to add/remove fonts specified by direct font path please use [Store fonts API](/docs/store-overview#working-with-fonts).