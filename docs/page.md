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
store.activePage?.zIndex(0);
```

### `page.children`

You can use `children` property to access elements inside the page

```js
// move every element by 10px to the right
store.activePage?.children.forEach((element) => {
  element.set({ x: element.x + 10 });
});
```
