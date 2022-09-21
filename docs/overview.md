---
id: overview
title: Overview
---

## Why `polotno`?

`Polotno` is a opinionated JavaScript library and React components to build canvas editor for several business use cases.

There are many powerful JavaScript frameworks and tools that can help you make a canvas editor. But almost all of them are "low-level". Like https://konvajs.org/ is a 2d canvas framework. It is good, it is powerful. But you may need to write **a lot of code** to make a full canvas editor app.

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

// import css styles from blueprint framework (used by polotno)
// if you bundler doesn't support such import you can use css from CDN (see bellow)
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

const { store } = createDemoApp({
  container: document.getElementById('root'),
  key: 'YOUR_API_KEY', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
```

Optionally you can import css styles from CDN:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="unpkg"
values={[
{label: 'unpkg', value: 'unpkg'},
{label: 'jsdelivr', value: 'jsdelivr'}
]}>
<TabItem value="unpkg">

```html
<link
  href="https://unpkg.com/@blueprintjs/icons@4/lib/css/blueprint-icons.css"
  rel="stylesheet"
/>
<link
  href="https://unpkg.com/@blueprintjs/core@4/lib/css/blueprint.css"
  rel="stylesheet"
/>
<link
  href="https://unpkg.com/@blueprintjs/popover2@1/lib/css/blueprint-popover2.css"
  rel="stylesheet"
/>
```

</TabItem>
<TabItem value="jsdelivr">

```html
<link
  href="https://cdn.jsdelivr.net/npm/@blueprintjs/icons@4/lib/css/blueprint-icons.css"
  rel="stylesheet"
/>
<link
  href="https://cdn.jsdelivr.net/npm/@blueprintjs/core@4/lib/css/blueprint.css"
  rel="stylesheet"
/>
<link
  href="https://cdn.jsdelivr.net/npm/@blueprintjs/popover2@1/lib/css/blueprint-popover2.css"
  rel="stylesheet"
/>
```

</TabItem>

</Tabs>

## Core concept

### Store

Store is the main object to control data and elements of canvas. It provide API for adding/updating/removing canvas objects, undo/redo, selection changes, zooming.

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
};
```

### UI components

Set of React components for general canvas editor app.

- a toolbar for basic objects manipulations actions (such as align, remove, change objects styles, etc).
- side panels for adding new objects
- zooming buttons
- etc

```js
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};
```

### Styles

Most of `Polotno` UI is made with [Blueprint](https://blueprintjs.com/) framework. If your are making your own custom UI interface or additional components I recommend to use `blueprint` when possible. But you can always use your own custom solutions or other style frameworks.

Polotno is using [Blueprint Icons](https://blueprintjs.com/docs/#icons) and [Meronex Icons](https://icons.meronex.com/). So I recommend to use them for your UI.

### Reactivity

Polotno internals are made with [mobx](https://mobx.js.org/) library. You can use `mobx` API to add reactivity to your own application. [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome) library. In React framework you will need `observer()` function:

```js
import { observer } from 'mobx-react-lite';

const App = observer(({ store }) => {
  return (
    <div>
      <p>Here we will define our own custom tab.</p>
      <p>Elements on the current page: {store.activePage?.children.length}</p>
    </div>
  );
});
```
