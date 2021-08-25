---
id: store-overview
title: Store
---

`Store` is a basic data model object they you are going to work with. It has about %90 API functions provided by `Polotno`.

## Working with pages

```js
import { createStore } from 'polotno/model/store';
const store = createStore({
  key: 'YOUR_API_KEY', // you can create it here: https://polotno.dev/cabinet/
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
```

### `store.addPage()`

Store is a set of pages. Each pages have elements on it.

```js
const page = store.addPage();
```

### `store.pages`

The getter. Returns all pages of the store.

### `store.activePage`

The getter. Returns current active page or the last created.

### `store.deletePages(ids)`

Remove pages from the store

```js
// remove current page
store.deletePages([store.activePage.id]);
```

## UI

### `store.width` and `store.height`

Returns size of every page.

```js
console.log('Width is', store.width);
```

### `store.setSize(width, height, shouldUseMagicResize?)`

Set new size of every page in the store

```js
// just change the pages size
store.setSize(1000, 500);

// resize all pages and apply "magic resize"
// magic resize will automatically change sizes of all elements and adjust their position for a new size
store.setSize(1000, 500, true);
```

### `store.scale`

Getter for current zoom level of the active page.

```js
console.log('zoom is', store.scale);
```

### `store.setScale(size)`

Change zooming of active page.

```js
store.setScale(2);
```

### `store.openedSidePanel`

Getter for current opened side panel

### `store.openSidePanel(panelName)`

Change open side panel manually.

```js
store.openSidePanel('templates');
```

## Working with elements

### `store.selectedElements`

Returns array of currently selected elements on the current page

```js
const firstSelected = store.selectedElements[0];
```

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

### `store.getElementById(id)`

Finds elements on the store by passed id:

```js
const element = store.getElementById('some-id');
element.set({ x: 0 });
```

## History

### `store.history.canUndo`

Can we undo state?

### `store.history.undo()`

Undo last changes

```js
store.activeElements[0].set({ x: 10 });
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

### `store.history.transaction(async () => {})`

Batch several actions into one history entry.

```js
store.history.transaction(async () => {
  const element = store.activePage.addElement({
    type: 'text',
    text: 'loading',
  });
  const text = await serverRequest();
  element.set({ text });
});
```

### `store.history.ignore(async () => {})`

Run transaction that should be ignored in history

```js
store.history.ignore(() => {
  // that change will be NOT create new history point
  element.set({ x: 0, y: 0 });
});
```

### `store.history.startTransaction()`

Create a new history transaction. After that command all changes will be recorded as one history point.

### `store.history.endTransaction()`

Finish created transaction and record all changes as one history point.

## Serializations

### `store.toJSON()`

Save store into plain object.

```js
const json = store.toJSON();

// your own function to save JSON somewhere
saveIntoBackend(JSON.stringify(json));
```

### `store.loadJSON(json, keepHistory?)`

Load passed json into the store. It will update all properties, pages and elements. By default loading JSON into the store will reset undo/redo history (so a user can't undo it). You can use `keepHistory` argument, if you want to preserve the history.

```js
import { createStore } from 'polotno/model/store';
const store = createStore({
  key: YOUR_API_KEY, // you can create it here: https://polotno.dev/cabinet/
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

// save to JSON at some point of time
const json = store.toJSON();

// load from JSON
// remember that "json" should be a javascript object
// if you have a json string, you may need to parse it - JSON.parse(string);
store.loadJSON(json);

// load JSON by save previous undo history
// a user can undo this action
store.loadJSON(json, true);
```

## Export

### `store.waitLoading()`

Wait until all resources (images, fonts, etc) are loaded and displayed on the canvas.

```js
// import data
store.loadJSON(json);
// wait for loading
await store.waitLoading();
// do export
const url = store.toDataURL();
```

### `store.toDataURL()`

Convert store into base64 URL

```js
// default export
store.toDataURL();

// make exported image 2x bigger (higher quality)
store.toDataURL({ pixelRatio: 2 });

// ignore page background on export
store.toDataURL({ ignoreBackground: true });

// export as jpg
store.toDataURL({ mimeType: 'image/jpg' });

// export only required page
store.toDataURL({ pageId: store.pages[1].id });
```

### `store.saveAsImage()`

`saveAsImage` will export drawing into image and save it as local file. By default it exports just the first page. If you need to export another pages, pass `pageId` property.

```js
// default export
store.saveAsImage({ fileName: 'polotno.png' });

// export as jpg
store.saveAsImage({ mimeType: 'image/jpg' });

// make exported image 2x bigger (higher quality)
store.saveAsImage({ pixelRatio: 2 });

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
store.saveAsPDF({ pixelRatio: 2 });

// ignore page background on export
store.saveAsPDF({ ignoreBackground: true });

// export second page
store.saveAsPDF({ pageId: store.pages[1].id });
```

## Working with fonts

### `store.addFont({ fontFamily, url })`

The function to add a new custom font to the user project. Added fonts will be saved into exported JSON. If you want to add fonts available globally (ignored in JSON export), take a look into [Fonts Tutorial](/docs/config#how-to-change-available-fonts).

```js
store.addFont({
  fontFamily: 'MyCustomFont',
  url: serverUrlOrBase64,
});
```

Also you can use a richer API for more control:

```js
store.addFont({
  fontFamily: 'MyCustomFont',
  styles: [
    {
      src: 'url(pathToNormalFile.ttf)',
      fontStyle: 'normal',
      fontWeight: 'normal',
    },
    {
      src: 'url(pathToBoldFile.ttf)',
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
  ],
});
```

Or you can just register font in the store and then **manually** add required CSS into the page:

```js
store.addFont({
  fontFamily: 'MyCustomFont',
});
```

### `store.removeFont(name)`

Remove custom font from the store by its name

```js
store.removeFont('MyCustomFont');
```

### `store.loadFont(name)`

Prepare the font to use on the webpage. Text elements inside `<Workarea>` will use this function automatically.
But it can be useful if you want to show a list of fonts somewhere in the UI.
`store.loadFond(name)` function will add font to the webpage, so the browser can render correct font.
