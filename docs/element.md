---
id: element-overview
title: Element
---

`Element` represents a graphical object on the page. An element can have one of these types:

- text
- image
- svg

```js
page.addElement({
  type: 'text',
  x: 50,
  y: 50,
  fill: 'black',
  text: 'hello',
});
```

## Basic actions


### `element.set(attrs)`

Set new attributes to the element.

```js
text.set({ x: text.x + 10, text: 'new text' });
```

### `element.moveUp()`

Move element up on z-index.

```js
text.moveUp();
```

### `element.moveDown()`

Move element up on z-index.

```js
text.moveToBottom();
```


### `element.moveTop()`

Move element to the top of the page or a group.

```js
text.moveTop();
```

### `element.moveBottom()`

Move element to the bottom of the page or a group.

```js
text.moveBottom();
```

### Locking

You can lock elements changes with `locked` property. Locked elements can't be changed by the end user from the canvas. So users can't drag them and resize them. Locked elements still can be changed from the code.

```js
// lock the object
element.set({ locked: true });

// unlock it
element.set({ locked: false });
```

## Text element

Text elements allows you to create a text on the canvas.

Here is the example of default properties.

```js
page.addElement({
  type: 'text',
  x: 0,
  y: 0,
  rotation: 0,
  locked: false,
  blurEnabled: false,
  blurRadius: 10,
  brightnessEnabled: false,
  brightness: 0,
  text: 'Hey, polotno',
  fontSize: 14,
  fontFamily: 'Roboto',
  fontStyle: '',
  textDecoration: '',
  fill: 'black',
  align: 'center',
  width: 0,
  strokeWidth: 0,
  stroke: 'black',
});
```

## Image element

Image element will draw an image on the canvas. By default images will do smart-cropping to fit into its size.

```js
page.addElement({
  type: 'image',
  x: 0,
  y: 0,
  rotation: 0,
  locked: false,
  blurEnabled: false,
  blurRadius: 10,
  brightnessEnabled: false,
  brightness: 0,
  src: 'https://example.com/image.png',
  clipDirection: 'center-middle',
  width: 100,
  height: 100,
});
```

## SVG element

`SVG` elements works very similar to `Image` element, but has ability to replace its internal colors (not supported for all possible svgs).

```js
const svgElement = page.addElement({
  type: 'svg',
  x: 0,
  y: 0,
  rotation: 0,
  locked: false,
  blurEnabled: false,
  blurRadius: 10,
  brightnessEnabled: false,
  brightness: 0,
  svgSource: 'https://example.com/image.svg',
  width: 100,
  height: 100,
});
```

### `svgElement.replaceColor(oldColor, newColor)`

Some svg files support color replacement. `Polotno` can do that when a color of internal svg node is defined as `fill` property.
You can replace some colors, to modify original image.

```js
svgElement.replaceColor('red', 'blue');
```

