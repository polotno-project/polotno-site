---
id: page-overview
title: Page
---

`Page` is a basic object that to store elements. The `store` may have several pages

```js
const page = store.addPage()
```


### `page.addElement(attrs)`

Creates an element with specified attributes. It is important to provide `type` attribute of the element.

```js
page.addElement({
  type: 'text',
  x: 50,
  y: 50,
  fill: 'black',
  text: 'hello',
});
```