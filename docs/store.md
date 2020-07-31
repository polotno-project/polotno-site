---
id: store-overview
title: Store overview
---

`Store` is a basic data model object they you are going to work with. It has about %90 API functions provided by `Polotno`.



## Working with pages


```js
import { createStore } from 'polotno/model/store';
const store = createStore();
```

### `store.addPage()`


Store is a set of pages. Each pages have elements on it.

```js
const page = store.addPage()
```

### `store.pages`

The getter. Returns all pages of the store.


### `store.activePage`

The getter. Returns current active page or the last created.


### UI

### `store.width` and `store.height`

Returns size of every page.

```js
console.log('Width is', store.width)
```

### `store.setSize(size)`

Set new size of every page in the store

```js
store.setSize({ width: 1000, height: 500 });
```

### `store.scale`

Getter for current zoom level of the active page.

```js
console.log('zoom is', store.scale)
```

### `store.setScale(size)`

Change zooming of active page.

```js
store.setScale(2);
```



## Working with active elements

### `store.activeElements`

Returns array of currently selected elements on the current page

### `store.selectElements(ids)`

Selects elements on the canvas by their ids.

```js
store.selectElements([element1.id, element2.id]);
```

### `store.deleteElements(ids)`

Remove elements from the store.

```js
store.deleteElements([element1.id, element2.id]);
```

## History

### `store.history.canUndo`

Can we undo state?

### `store.history.undo()`

Undo last changes

```js
store.activeElements[0].set({ x: 10});
store.history.undo();
```


### `store.history.canRedo`

Can we redo state?


### `store.history.redo()`

Redo changes.

```js
// cancel changes
store.history.undo();

// apply changes again
store.history.redo();
```
