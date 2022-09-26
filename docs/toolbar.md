---
title: Toolbar UI
---

`Toolbar` is a UI components to change elements on the canvas, reorder and align them, apply undo/redo.

![Toolbar image](/img/toolbar.png)

Basic usage:

```js
import Toolbar from 'polotno/toolbar/toolbar';
import Workspace from 'polotno/canvas/workspace';

const App = ({ store }) => {
  return (
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
    </div>
  );
};
```

Also `Toolbar` component has additional properties to hide some elements and overwrite inputs for some properties.

```js
type ToolbarProps = {
  store: StoreType,
  downloadButtonEnabled?: Boolean,

  hidePosition?: boolean,
  hideOpacity?: boolean,
  hideDuplicate?: boolean,
  hideLock?: boolean,
  hideRemove?: boolean,

  // see how to use it in the example below
  components?: any,
};

// example
<Toolbar store={store} hideDuplicate />;
```

### How to overwrite available inputs for an element type?

In some application you may want to change available properties for selected element type. E.g. you may want to show a different color picker for `text` element. You can use `components` property for that. Just pass a component in format `TypeName` e.g. `TextFill`. You can use all built-element types as `Text`, `Image`, `Svg`. But also you can use `Many` prefix when several elements are selected.

There are several built-in components but also you can add your own.

```
text element:
  TextFontFamily
  TextFontSize
  TextFontVariant
  TextFilters
  TextFill
  TextSpacing
image elements
  ImageFlip
  ImageFilters
  ImageFitToBackground
  ImageCrop
  ImageRemoveClip
  ImageRemoveBackground
svg element:
  SvgFlip
  SvgFilters
  SvgColors
```

Example:

```js
import Toolbar from 'polotno/toolbar/toolbar';
import Workspace from 'polotno/canvas/workspace';
import { observer } from 'mobx-react-lite';

const MyColorPicker = observer(({ store, element, elements }) => {
  // store - main polotno store object
  // elements - array of selected elements. The same as store.selectedElements
  // element - first selected element. The same as store.selectedElements[0]
  const element = store.selectedElement;
  return (
    <div>
      <input
        type="color"
        value={element.fill}
        onChange={(e) => {
          element.set({
            fill: e.target.value,
          });
        }}
      />
    </div>
  );
});

const App = ({ store }) => {
  return (
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
      <Toolbar store={store} components={{ TextFill: MyColorPicker }} />
      <Workspace store={store} />
    </div>
  );
};
```

### How to overwrite all inputs at once?

In some application you may want to change available properties for selected element. Following [Custom Element Example](/docs/custom-element) you can make your own React component for any available element.

> I recommend to use `blueprintjs` components to make your UI and use `<Navbar.Group>` to group inputs. Also remember to wrap your component to `observer` from `mobx-react-lite` library to add automatic reactivity of your components.

Example:

```js
import React from 'react';
import { observer } from 'mobx-react-lite';
import { NumericInput, Navbar, Alignment } from '@blueprintjs/core';

import ColorPicker from 'polotno/toolbar/color-picker';
import { unstable_registerToolbarComponent } from 'polotno/config';

const TextToolbar = observer(({ store }) => {
  const element = store.selectedElements[0];

  return (
    <Navbar.Group align={Alignment.LEFT}>
      <ColorPicker
        value={element.fill}
        onChange={(fill) =>
          element.set({
            fill,
          })
        }
        store={store}
      />
      <NumericInput
        onValueChange={(fontSize) => {
          element.set({ fontSize: fontSize });
        }}
        value={element.fontSize}
        style={{ width: '50px', marginLeft: '10px' }}
        min={1}
        max={40}
      />
    </Navbar.Group>
  );
});

unstable_registerToolbarComponent('text', TextToolbar);
```

### How to overwrite "Download" button

On the right side of the toolbar, Polotno has "Action Controls" section. You can use `components` prop to overwrite this section.

> Recommendation: keep "Action Controls" as small as possible. `<Toolbar />` component already has a lot of tools. So it is better give it as much available width as possible. You can put "Action Controls" somewhere else in the UI of your application. For example, take a look into https://studio.polotno.com/. Download button is placed on the top of the app instead of the `<Toolbar />`.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-toolbar-actions" target="_blank">Open Demo</a></p>

```js
import { Toolbar } from 'polotno/toolbar/toolbar';
import { Button } from '@blueprintjs/core';
import { DownloadButton } from 'polotno/toolbar/download-button';

// it is important to define component onside of `MyToolbar` render function
const ActionControls = ({ store }) => {
  return (
    <div>
      <DownloadButton store={store} />
      <Button
        intent="primary"
        onClick={() => {
          alert('Saving');
        }}
      >
        Save
      </Button>
    </div>
  );
};

const MyToolbar = ({ store }) => {
  return (
    <Toolbar
      store={store}
      components={{
        ActionControls,
      }}
    />
  );
};
```

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-toolbar-actions?fontsize=14&hidenavigation=1&theme=dark&view=preview"
    style={{
      width: '100%',
      height: '700px',
      border: 0,
      overflow: 'hidden',
    }}
    title="Polotno demo"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-downloads"
  ></iframe>
