---
id: element-overview
title: Element
---

`Element` represents a graphical object on the page. An element can have one of these types:

- text
- image
- svg

```js
const element = store.activePage.addElement({
  type: 'text',
  x: 50,
  y: 50,
  fill: 'black',
  text: 'hello',
});
```

## Basic actions

### Read properties

At any time you can access any property of an element. See documentation for every type of element to see all available properties.

```js
const element = store.selectedElements[0];
// logs type of element
console.log(element.type);
// logs id of element
console.log(element.id);
```

### `element.set(attrs)`

Set new attributes to the element.

```js
text.set({ x: text.x + 10, text: 'new text' });
```

### Custom properties

You can't write ANY property directly into element. If you want to write some additional data into an element, you can use `custom` attribute.

```js
// this line will not work, because elements has no attribute userId
element.set({ userId: '12' });
// you can write such data into "custom" attribute
element.set({ custom: { userId: '12' } });
// read custom attribute
console.log(element.custom?.userId);
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
  shadowEnabled: false,
  shadowBlur: 10,
  text: 'Hey, polotno',
  // placeholder is working similar to input placeholder
  // it will be rendered if no text is defined
  // and we will use it in input element too
  // useful for template canvas, where users will need to replace text elements
  placeholder: '',
  fontSize: 14,
  fontFamily: 'Roboto',
  fontStyle: 'normal', // can be normal or italic
  fontWeight: 'normal', // can be normal or bold or some other CSS variations
  textDecoration: '',
  fill: 'black',
  align: 'center',
  width: 0,
  strokeWidth: 0,
  stroke: 'black',
  lineHeight: 1,
  letterSpacing: 0, // % from font size
});
```

### text.toggleEditMode()

Enable edit mode for the text. It puts cursor inside the text and a user can do regular text editing.

You can use `text.toggleEditMode()` to enter "edit mode" programmatically. For example, right after you created a new text element.

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
  shadowEnabled: false,
  shadowBlur: 10,
  src: 'https://example.com/image.png',
  clipDirection: 'center-middle',
  width: 100,
  height: 100,
});
```

### `image.toggleCropMode()`

Enter into "crop mode" of the image programmatically.

## SVG element

`SVG` elements works very similar to `Image` element, but has ability to replace its internal colors (not supported for all possible svgs).

```js
const svgElement = page.addElement({
  type: 'svg',
  src: 'https://example.com/image.svg',
  x: 0,
  y: 0,
  rotation: 0,
  locked: false,
  blurEnabled: false,
  blurRadius: 10,
  brightnessEnabled: false,
  brightness: 0,
  shadowEnabled: false,
  shadowBlur: 10,
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
