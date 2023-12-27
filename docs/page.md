---
id: page-overview
title: Page
---

`Page` is a container for elements in the `store`. The `store` may have several pages.

```js
const page = store.addPage({
  background: 'grey', // default is "white"
});
```

### `page.set(attrs)`

You can use `set()` method to change some properties of the page container. For now use can change `background` and `custom` attributes

```js
page.set({
  // background can be any CSS color string or a url to the image
  background: 'red',
  // you can use "custom" attribute to save your own custom data
  custom: { myInternalId: 'some-id-here' },
  bleed: 10, // in pixels
  width: 1000, // in pixels. You can use 'auto' to inherit width from the store
  height: 1000, // in pixels. You can use 'auto' to inherit height from the store
});
```

### `page.setSize({ width, height, useMagic })`

Change size of specified page. If `useMagic` is `true`, all elements will be resized proportionally.

```js
page.setSize({
  width: 1000,
  height: 1000,
  useMagic: true,
});
```

### `page.addElement(attrs)`

Creates an element with specified attributes. It is important to provide `type` attribute of the element.

```js
store.activePage?.addElement({
  type: 'text',
  x: 50,
  y: 50,
  fill: 'black',
  text: 'hello',
});
```

### `page.clone()`

Duplicate the page.

```js
store.activePage?.clone();
```

### `page.setZIndex(index)`

Change order of pages

```js
// move active page to the beginning of list
store.activePage?.setZIndex(0);
```

### `page.children`

You can use `children` property to access elements inside the page

```js
// move every element by 10px to the right
store.activePage?.children.forEach((element) => {
  element.set({ x: element.x + 10 });
});
```

### `page.computedWidth`

Return width of the page in pixels.

### `page.computedHeight`

Return height of the page in pixels.
