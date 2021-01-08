---
title: Side Panel
---

`SidePanel` provides default set of components for adding new elements into the canvas, changing pages sizes, etc.


```js
import SidePanel from 'polotno/side-panel/side-panel';

const MyPanel = () => {
  return <div><SidePanel store={store} /></div>;
}
```


The `SidePanel` will automatically take full width and height of its parent. So you don't have adjust its size manually. You can just setup the size of parent `<div>` with CSS.

### How to customize side panel tabs?

You can pass `sections` property to `<SidePanel />` component to specify all available tabs manually. Here is the default UI:

```js
import SidePanel, { DEFAULT_SECTIONS } from 'polotno/side-panel/side-panel';

const MyPanel = () => {
  return <div><SidePanel store={store} sections={DEFAULT_SECTIONS} /></div>;
}
```

Here is the custom solution:





