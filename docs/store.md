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


### `store.activePage`

The getter. Returns current active page or the last created


## Working with active elements

### `store.activeElements`

Returns array of currently selected elements on the current page

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
