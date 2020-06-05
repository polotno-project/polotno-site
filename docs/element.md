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


### `element.moveToTop()`

Move element to the top of the page or a group.

```js
text.moveToTop();
```

### `element.moveToBottom()`

Move element to the bottom of the page or a group.

```js
text.moveToBottom();
```