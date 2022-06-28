---
title: Workspace UI
---

`Workspace` is issential part of `Polotno` framework. It is the main `React` component that you are going to use to display the drawings and interact with them. You can change canvas and its content programmatically using [Store API](/docs/store-overview).

```js
import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

const store = createStore({
  key: YOUR_API_KEY, // you can create it here: https://polotno.com/cabinet/
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

## Customize page controls

You can customize page controls of your `<Workspace />` component. You can remove some buttons, add new one, etc. You are in total control on what else you want to see around page on the canvas.

Take a look into [Page Name Demo](/docs/demo-page-name) to see controls component in action.

```js
<Workspace
  store={store}
  components={{
    PageControls: ({ width, height, xPadding, yPadding }) => (
      <div
        style={{
          position: 'absolute',
          top: yPadding + 'px',
          left: xPadding + 'px',
        }}
      >
        My controls here...
      </div>
    ),
  }}
/>
```

## Hide page controls

Optionally you can hide UI to add/remove/duplicate pages.

```js
<Workspace store={store} components={{ PageControls: () => null }} />
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

## No pages UI

If your `store` has no pages, `<Workspace />` component will show a simple UI with a button to create a new page.
You can overwrite this UI with your own.

```js
<Workspace
  store={store}
  components={{
    NoPages: ({ store }) => <div>The project has no pages...</div>,
  }}
/>
```
