---
title: Workspace
---

`Workspace` is the main `React` component that you are going to use to display the drawings and interact with them. All manipulations with canvas are made via [Store](/docs/store-overview).

```js
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

const store = createStore({
  key: YOUR_API_KEY, // you can create it here: https://polotno.dev/cabinet/
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

const App = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Workspace store={store} />
    </div>
  );
};
```

The `Workspace` will automatically take full width and height of its parent. So you don't have adjust its size manually. You can just setup the size of parent `<div>` with CSS.

## Hide page controls

Optionally you can hide UI to add/remove/duplicate pages.

```js
<Workspace store={store} pageControlsEnabled={false} />
```

## Workspace styling

Optionally you can change some styles of the workspace.

```js
<Workspace
  store={store}
  backgroundColor="grey"
  pageBorderColor="black" // border around page
  activePageBorderColor="red" // border around active page. It will be used only if you have several pages. Otherwise just pageBorderColor will be used
/>
```
