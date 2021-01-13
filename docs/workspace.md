---
title: Workspace
---

`Workspace` is the main `React` component that you are going to use to display the drawings and interact with them. All manipulations with canvas are made via [Store](/docs/store-overview).


```js
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

const store = createStore({
  key: YOUR_API_KEY // you can create it here: https://polotno.dev/cabinet/
});

const App = () => {
  return <div><Workspace store={store} /></div>;
}
```


The `Workspace` will automatically take full width and height of its parent. So you don't have adjust its size manually. You can just setup the size of parent `<div>` with CSS.