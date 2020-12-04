---
id: store-overview
title: Store overview
---

`Store` is a basic data model object they you are going to work with. It has about %90 API functions provided by `Polotno`.



## Working with pages


```js
import { createStore } from 'polotno/model/store';
const store = createStore({
  key: 'YOUR_API_KEY', // make it empty for dev version
});
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


## UI

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

## Serializations

### `store.toJSON()`

Save store into plain object.

```js
const json = store.toJSON();

// your own function to save JSON somewhere
saveIntoBackend(JSON.stringify(json));
```

### `store.loadJSON()`

Load passed json into the store. It will update all properties, pages and elements

```js
import { createStore } from 'polotno/model/store';
const store = store.createStore();

// save to JSON at some point of time
const json = store.toJSON();


// load from JSON
// remember that "json" should be a javascript object
// if you have a json string, you may need to parse it - JSON.parse(string);
store.loadJSON(json);
```


## Export

### `store.toDataURL()`

Convert store into base64 URL

```js
// default export
store.toDataURL();

// make exported image 2x bigger (higher quality)
store.toDataURL({ pixelRatio: 2})

// ignore page background on export
store.toDataURL({ ignoreBackground: true });
```


### `store.saveAsImage()`

`saveAsImage` will export drawing into image and save it as local file. By default it exports just the first page. If you need to export another pages, pass `pageId` property.

```js
// default export
store.saveAsImage({ fileName: 'polotno.png' });

// make exported image 2x bigger (higher quality)
store.saveAsImage({ pixelRatio: 2})

// ignore page background on export
store.saveAsImage({ ignoreBackground: true });

// export second page
store.saveAsImage({ pageId: store.pages[1].id });
```

### `store.saveAsPDF()`

`saveAsPDF` will export drawing into PDF and save it as local file. By default it exports just the first page. If you need to export another pages, pass `pageId` property.


```js
// default export
store.saveAsPDF({ fileName: 'polotno.pdf' });

// make exported image 2x bigger (higher quality)
store.saveAsPDF({ pixelRatio: 2})

// ignore page background on export
store.saveAsPDF({ ignoreBackground: true });

// export second page
store.saveAsPDF({ pageId: store.pages[1].id });
```

## Working with fonts

### `store.addFont({ name, url })`

The function to add new custom font to the project.

```js
store.addFont({
  name: 'MyCustomFont',
  url: someServerUrlOrBase64
})
```

### `store.removeFont(name)`

Remove custom font from the store by its name

```js
store.removeFont('MyCustomFont');
```

### `store.loadFont(name)`

Prepare the font to use on the webpage. You don't need to use that function is you work only on the canvas elements (they load fonts automatically).
But it can be useful when you want to show a list of fonts somewhere in the UI.
`store.loadFond(name)` function will add font to the webpage, so the browser can render correct font.
