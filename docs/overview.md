---
id: overview
title: Overview
---

**The documentation is not fully ready and to complete yet!** It will be updated very soon. Thanks for your understanding.

## Why `polotno`?

`Polotno` is a very opinionated JavaScript framework that will help you build canvas editor for several business use cases.

There are many powerful JavaScript frameworks and tools that can help you make a canvas editor. But almost all of them are "low-level". Like https://konvajs.org/ is a 2d canvas framework. It is good, it is powerful. But you may need to write a lot of code to make a full canvas editor app.

So the idea is to make a simple tool to solve only very limited set of business needs. It doesn't have many options and configurations. And the API should be as small as possible.

So you can just add it into the page and you have a full featured solution.

## Quick start

Install `polotno` package:

```bash
npm install polotno
```

Init demo application (without any frameworks):


```js
import { createDemoApp } from 'polotno/polotno-app';

const { store } = createDemoApp({
  container: document.getElementById('root'),
  key: 'YOUR_API_KEY' // use empty string for dev version 
});
```

Add styles to your page:

```html
<link href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css" rel="stylesheet" />
<link href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css" rel="stylesheet" />
```

## Core concept

`Polotno` consists of three main modules


### Store

For saving and working with the objects tree of canvas editor. It provide API for adding/updating/removing canvas objects, undo/redo, selection changes, zooming.

```js
import { createStore } from 'polotno/model/store';

const store = createStore();
const page = store.addPage();

page.addElement({
  x: 50,
  y: 50,
  type: 'text',
  fill: 'black',
  text: 'hello',
});
```



### Workarea React canvas component

React component for drawing canvas app on the page. It has all basic functionality for common edits: selection, resize, actual drawing of objects, snapping, etc.

```js
import Workspace from 'polotno/canvas/workspace';

const App = () => {
  return <Workspace store={store} />;
}
```

### UI components

Set of React components for general canvas editor app.

- a toolbar for basic objects manipulations actions (such as align, remove, change objects styles, etc).
- side panels for adding new objects

```js
import Toolbar from 'polotno/toolbar/toolbar';
import ZoomButtons from 'polotno/toolbar/zoom-buttons';
import SidePanel from 'polotno/side-panel/side-panel';

export const App = ({ store }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <div style={{ width: '300px', height: '100%', display: 'flex' }}>
        <SidePanel store={store} />
      </div>
      <div
        style={{
          display: 'flex',
          height: '100%',
          margin: 'auto',
          flex: 1,
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </div>
    </div>
  );
};
```