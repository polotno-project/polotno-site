---
title: How to replace colors in SVG images
author: Anton Lavrenov
---

![Color replace demo](/img/replace-colors-in-svg.gif)

In `Polotno` application you can replace colors in SVG images. This post will describe basic steps to implement such functionality.

## How does color replace in SVG work?

In order to replace colors in SVG we should:

1. Parse SVG image file
2. Find all used colors in the image
3. Replace required colors with different values
4. Serialize data back into SVG image

## Parsing SVG image.

If you have an URL path to SVG image we need to download it and then parse it to get access to all elements:

```js
// download svg file and get its content as string
export async function urlToString(url) {
  const req = await fetch(url, { mode: 'cors' });
  const svgString = await req.text();
  return svgString;
}

// parse svg string into DOM
export function parseSVG(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  return doc;
}
```

## Finding colored elements

When we have access to the DOM of SVG image we can inspect all its elements and find elements that has any color.

```js
// get color of element
// we can also check styles of element and other properties like "stroke"
export function getElementColor(el) {
  return el.getAttribute('fill');
}

// find all colors used in svg
export function getColors(svgString) {
  const doc = parseSVG(svgString);
  var elements = doc.getElementsByTagName('*');
  const usedColors = [];
  for (const element of elements) {
    const color = getElementColor(element);
    // if color is defined and uniq we will add it
    if (color && usedColors.indexOf(color) === -1) {
      usedColors.push(color);
    }
  }
  return usedColors;
}
```

## Replacing colors

As soon as we have all colors used in the image, we show them in UI and ask a user to change these colors. All changed we will save in a special map object.

```js
const replaceMap = {
  [oldColor]: newColor,
};
```

```js
// replace colors in svg string
// map is an objects with "oldColor: newColor" values
export function replaceColors(svgString, map) {
  // we can do some RegExp magic here
  // but I will just manually check every element
  const doc = parseSVG(svgString);
  var elements = doc.getElementsByTagName('*');

  for (const element of elements) {
    const color = getElementColor(element);
    if (map[color]) {
      element.setAttribute('fill', map[color]);
    }
  }
  // serialize DOM back into string
  var xmlSerializer = new XMLSerializer();
  const str = xmlSerializer.serializeToString(doc);
  return str;
}

// an example of replacing red color with the back
replaceColors(svgString, { red: 'black' });
```

Demo:

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/blog-replace-svg-color?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
