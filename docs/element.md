---
id: element-overview
title: Element
---

`Element` represents a graphical object on the page. An element can have one of these types:

- `text`
- `image`
- `svg`

```js
const element = store.activePage.addElement({
  type: 'text',
  x: 50,
  y: 50,
  fill: 'black',
  text: 'hello',
});

// logs 50
console.log(element.x);

// set new position
element.set({ x: 100 });
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

You can use `draggable`, `contentEditable` and `styleEditable` attributes to lock element editing.

```js
// lock the object
element.set({
  // can element be moved and resized
  draggable: false,
  // can we change content of element?
  contentEditable: false,
  // can we change style of element?
  styleEditable: false,
});

console.log(element.locked); // true

// unlock it
element.set({
  // can element be moved and resized
  draggable: true,
  // can we change content of element?
  contentEditable: true,
  // can we change style of element?
  styleEditable: true,
});
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
  locked: false, // deprecated
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
  letterSpacing: 0, // % from font size,

  // can user select element?
  // if false, element will be "invisible" for user clicks
  selectable: true,
  // use for absolute positing of element
  alwaysOnTop: false,
  // also we can hide some elements from the export
  showInExport: true,
  // can element be moved and resized
  draggable: true,
  // can we change content of element?
  contentEditable: true,
  // can we change style of element?
  styleEditable: true,
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
  locked: false, // deprecated
  blurEnabled: false,
  blurRadius: 10,
  brightnessEnabled: false,
  brightness: 0,
  shadowEnabled: false,
  shadowBlur: 10,
  // url path to image
  src: 'https://example.com/image.png',

  // url path to svg or image that will be used to clip image
  // cab be used for image framing
  clipSrc: '',
  width: 100,
  height: 100,
  cropX: 0, // 0-1 : % from original image width
  cropY: 0, // 0-1 : % from original image height
  cropWidth: 1, // 0-1 : % from original image width
  cropHeight: 1, // 0-1 : % from original image height
  cornerRadius: 0,
  borderColor: 'black',
  borderSize: 0,
  flipX: false,
  flipY: false,

  // can user select element?
  // if false, element will be "invisible" for user clicks
  selectable: true,
  // use for absolute positing of element
  alwaysOnTop: false,
  // also we can hide some elements from the export
  showInExport: true,
  // can element be moved and resized
  draggable: true,
  // can we change content of element?
  contentEditable,
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
  maskSrc: '', // should we draw mask image over svg element?
  keepRatio: false, // can we change aspect ration of svg?
  x: 0,
  y: 0,
  rotation: 0,
  locked: false, // deprecated
  blurEnabled: false,
  blurRadius: 10,
  brightnessEnabled: false,
  brightness: 0,
  shadowEnabled: false,
  shadowBlur: 10,
  width: 100,
  height: 100,
  flipX: false,
  flipY: false,
  // can user select element?
  // if false, element will be "invisible" for user clicks
  selectable: true,
  // use for absolute positing of element
  alwaysOnTop: false,
  // also we can hide some elements from the export
  showInExport: true,
  // can element be moved and resized
  draggable: true,
  // can we change content of element?
  contentEditable,
});
```

### `svgElement.colors`

Array of colors detected in the svg image. You can use this array to replace colors in the svg image.

```js
console.log(svgElement.colors);
```

### `svgElement.replaceColor(oldColor, newColor)`

Some svg files support color replacement. `Polotno` can do that when a color of internal svg node is defined as `fill` property.
You can replace some colors, to modify original image.

```js
svgElement.replaceColor('red', 'blue');
```
