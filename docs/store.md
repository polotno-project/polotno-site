---
id: store-overview
title: Store
---

`Store` is a basic data model object they you are going to work with. It has about %90 API functions provided by `Polotno`.

## Working with pages

```js
import { createStore } from 'polotno/model/store';
const store = createStore({
  key: 'YOUR_API_KEY', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
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

### `store.selectPage(id)`

Mark a page as active. It will automatically scroll `<Workspace />` to that page.

```js
// select second page
store.selectPage(store.pages[1].id);
```

### `store.deletePages(ids)`

Remove pages from the store

```js
// remove current page
store.deletePages([store.activePage.id]);
```

### `store.clear()`

Remove all pages from the store

```js
store.clear(); // it will remove all data and reset undo history

store.clear({ keepHistory: true }); // it will remove all data but keep undo history
```

## UI

### `store.width` and `store.height`

Returns size of every page.

```js
console.log('Width is', store.width);
```

### `store.setSize(width, height, shouldUseMagicResize?)`

Set new size of every page in the store.

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

### `store.setUnit({ unit, dpi })`

Set unit metrics to use in UI.

```js
store.setUnit({
  unit: 'mm', // mm, cm, in, pt, px
  dpi: 300,
});
```

** Important! Setting new unit will NOT change values in store and elements attributes, such as `width`, `height`, `x`, `y`, `fontSize`!** They will still be saved in pixels. Unit metrics will be used only for default UI from Polotno.

### `store.unit`

Returns unit used in UI to display measures. By default it is `px`. You can change it to `pt`, `mm`, `cm`, `in`.

### `store.dpi`

Returns dpi used to convert pixels to other units.

### `store.toggleBleed()`

Show or hide bleed area on the workspace

```js
store.activePage.set({ bleed: 20 }); // set bleed in pixels

store.toggleBleed();
store.toggleBleed(false);
```

### `store.toggleRulers()`

Show or hide rulers on workspace

```js
store.toggleRulers();
store.toggleRulers(false);
```

### `store.setRole(role)`

Set role of the current user. Possible values are: `user` and `admin`. For more information see [Roles Documentation](/docs/user-roles).

```js
store.setRole('admin');
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

### `store.groupElements([element1.id, element2.id])`

Group elements. It will create a new element with type `group` and will move all passed elements inside it.

```js
const ids = store.selectedElements.map((el) => el.id);
store.groupElements(ids);
```

### `store.ungroupElements([element1.id, element2.id])`

Ungroup elements. It will move all elements inside group to the page and remove the group.

```js
const id = store.selectedElements[0].id;
store.ungroupElements([id]);
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

### `store.history.clear()`

Clear history.

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
  key: YOUR_API_KEY, // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
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

## Events

### `store.on('change', () => {})`

Listen to any changes in the store. The event may trigger frequently on some operations like resize or dragging. `store.on()` will return back unsubscribe function.

```js
// unsubscribe function
const off = store.on('change', () => {
  console.log('something changed');
});
// that line will unsubscribe from the event
off();

// write a function for throttle saving
let timeout = null;
const requestSave = () => {
  // if save is already requested - do nothing
  if (timeout) {
    return;
  }
  // schedule saving to the backend
  timeout = setTimeout(() => {
    // reset timeout
    timeout = null;
    // export the design
    const json = store.toJSON();
    // save it to the backend
    fetch('https://example.com/designs', {
      method: 'POST',
      body: JSON.stringify(json),
    });
  }, 1000);
};

// request saving operation on any changes
store.on('change', () => {
  requestSave();
});
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
const url = await store.toDataURL();
```

### `await store.toDataURL()`

Export store into image in base64 URL format

```js
// default export
await store.toDataURL();

// make exported image 2x bigger (higher quality)
await store.toDataURL({ pixelRatio: 2 });

// ignore page background on export
await store.toDataURL({ ignoreBackground: true });

// export as jpg
await store.toDataURL({ mimeType: 'image/jpg' });

// export only required page
await store.toDataURL({ pageId: store.pages[1].id });

// export with page bleed
await store.toDataURL({ includeBleed: true });
```

### `await store.saveAsImage()`

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

// export with page bleed
store.saveAsImage({ includeBleed: true });
```

### `async store.toPDFDataURL()`

Export store into PDF file in base64 URL format. You can use it to save to the backend.

```js
// default export
await store.toPDFDataURL();

// double exported quality
await store.toPDFDataURL({ pixelRatio: 2 });

// ignore page background on export
await store.toPDFDataURL({ ignoreBackground: true });

// export only sub set of pages
await store.toPDFDataURL({ pageIds: [store.pages[0].id, store.pages[2].id] });
```

### `await store.saveAsPDF()`

`saveAsPDF` will export drawing into PDF and save it as local file. By default it exports just the first page. If you need to export another pages, pass `pageId` property.

```js
// default export
await store.saveAsPDF({ fileName: 'polotno.pdf' });

// change default dpi
// changing DPI will not effect quality of the export. But it may change page size of exported PDF
await store.saveAsPDF({ dpi: 300 }); // default is store.dpi, it equals 72

// ignore page background on export
await store.saveAsPDF({ ignoreBackground: true });

// change export quality
await store.saveAsPDF({ pixelRatio: 2 });

// export with page bleed
await store.saveAsPDF({ includeBleed: true });

// export only sub set of pages
await store.saveAsPDF({ pageIds: [store.pages[0].id, store.pages[2].id] });
```

### `await store.toBlob()`

Export store into blob object, it may work faster than `toDataURL` method.

```js
// default export
await store.toBlob();

// make exported image 2x bigger (higher quality)
await store.toBlob({ pixelRatio: 2 });

// ignore page background on export
await store.toBlob({ ignoreBackground: true });

// export as jpg
await store.toBlob({ mimeType: 'image/jpg' });

// export only required page
await store.toBlob({ pageId: store.pages[1].id });

// export with page bleed
await store.toBlob({ includeBleed: true });
```

### `await store.toHTML()`

**Warning: this function is experimental and may produce inconsistent result**. Export store into HTML string.

### `await store.saveAsHTML()`

**Warning: this function is experimental and may produce inconsistent result**. Export store into HTML string and save it as local `.html` file.

### `await store.toGIFDataURL()`

Export store into GIF image in base64 URL format.

### `await store.saveAsGIF()`

`saveAsGIF` will export drawing into GIF and save it as local file.

### `store.setElementsPixelRatio(ratio)`

In most of scenarios `polotno` is rasterizing (converting into bitmap) vector elements such as texts and svg images.
When you do hight quality exports, you may want to temporary increase resolution of rendered elements.

```js
// make sure all elements are rendered with increased quality
store.setElementsPixelRatio(2);
// do the export
await store.toDataURL({ pixelRatio: 2 });
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
