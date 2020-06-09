---
id: overview
title: Overview
---


## Why `polotno`?

`Polotno` is a very opinionated JavaScript framework that will help you build canvas editor for several business use cases.

There are many powerful JavaScript frameworks and tools that can help you make a canvas editor. But almost all of them are "low-level". Like https://konvajs.org/ is a 2d canvas framework. It is good, it is powerful. But you may need to write a lot of code to make a full canvas editor app.

So the idea is to make a simple tool to solve only very limited set of business needs. It doesn't have many options and configurations. And the API should be as small as possible.

So you can just add it into the page and you have a full featured solution.

## Core concept

`Polotno` consists of three main modules


### Store

For saving and working with the objects tree of canvas editor. It provide API for adding/updating/removing canvas objects, undo/redo, selection changes, zooming.

```js
import Store from 'polotno/model/store';
const store = Store.create();
```



### Workarea canvas component

React component for drawing canvas app on the page. It has all basic functionality for common edits: selection, resize and actual drawing of objects.

```js
import Workspace from 'polotno/canvas/workspace';

const App = () => {
  return <Workspace store={store} />;
}
```

### Toolbars

Set of components created as a demo for general canvas editor app.
- a toolbar for basic objects manipulations actions (such as align, remove, change objects styles, etc).
- side panels for adding new objects

```js
import Toolbar from 'polotno/toolbar/toolbar';
import SidePanel from 'polotno/side-panel/side-panel';
```