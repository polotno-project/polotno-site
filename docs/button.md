---
title: Polotno Button
---

`Polotno Button` is a dedicated script that enables easy and efficient embedding of the Polotno Editor to any website. With just a simple button, you can give your app a new dimension of customization of any design. Like this:

import Button from '../button';

<Button />

## Why Use Polotno Button?

There are several key reasons why implementing a Polotno button can significantly benefit your website and eventually your business.

1. **User-Friendly Designing:** Online design tools, such as Polotno, push the boundaries of creativity with a precise and user-friendly UI, enabling even non-professionals users to create compelling designs. By incorporating the Polotno button into your application, you give your users the tools they need to go beyond traditional design boundaries.

2. **Seamless Integration:** The Polotno button can be seamlessly incorporated into your website, without the need for heavy coding or complex functionalities.

3. **Save Time and Resources:** With the Polotno button, users can effortlessly craft designs right within your platform. This could reduce the need for external design platforms or software, thereby saving time and resources.

4. **Boost Engagement:** Providing users with the ability to create and customize designs can lead to increased user engagement on your platform.

## How to integrate Polotno Button?

1. Add the Polotno Button script to your website.

```html
<script src="https://embed.polotno.com/button-v1.js"></script>
```

2. Create button somewhere on your page.

```html
<button id="polotno-button">Open Editor</button>
```

3. Initialize Polotno Button with your API key.

```js
const button = document.getElementById('polotno-button');
button.addEventListener('click', () => {
  window.createPolotnoEditor({
    key: 'my-api-key',
    sections: ['photos', 'text', 'elements', 'upload', 'background', 'layers'],
    onPublish: ({ dataURL, json }) => {
      // do something with generated image
      // also you can save json somewhere and load it later
    },
  });
});
```

## Demo

<Button showResult />

## Polotno Button Options

The Polotno Button can be customized to fit your needs.

```js
function inchesToPx(inches) {
  var dpi = 72; // dots per inch
  return inches * dpi;
}

window.createPolotnoEditor({
  key: 'my-api-key',
  // select sections you want to show
  sections: ['photos', 'text', 'elements', 'upload', 'background', 'layers'],
  // initial size of the canvas
  width: inchesToPx(20),
  height: inchesToPx(10),
  // load template from json file
  jsonUrl:
    'https://api.polotno.com/templates/2021-10-25-instagram-post-sunday-reminder.json',
  // load template from json object
  json: {
    // json object of the design
  },
  // change default text of the publish button
  publishLabel: 'Save',
  onPublish: ({ dataURL, json }) => {
    document.getElementById('result').src = dataURL;
    console.log('json', json);
  },
  // optionally you can react to any change in the editor
  // for example temporary save design somewhere to restore it later via jsonUrl
  // you may need to save JSON manually to your server
  onChange: ({ json }) => {
    console.log('json', json);
  },
  // you can pass initial uploads to the editor
  // then will be shown in the upload section
  uploads: [
    {
      url: 'https://example.com/image.jpg',
      preview: 'https://example.com/image.jpg',
    },
  ],
  // you can enable or disable animations
  // by default animations are disabled
  // warning - editor can't export into video or gif
  // you have to use Cloud API or your own server for that
  animationsEnabled: true,
});
```
