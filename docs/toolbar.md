---
title: Toolbar
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

Also `Toolbar` component has additional properties to hide some elements:

```js
type ToolbarProps = {
  store: StoreType,
  downloadButtonEnabled?: Boolean,

  hideTextSpacing?: boolean,
  hideTextEffects?: boolean,

  hideImageFlip?: boolean,
  hideImageEffects?: boolean,
  hideImageCrop?: boolean,
  hideImageFit?: boolean,

  hidePosition?: boolean,
  hideOpacity?: boolean,
  hideDuplicate?: boolean,
  hideLock?: boolean,
  hideRemove?: boolean,
};

// example
<Toolbar store={store} hideDuplicate downloadButtonEnabled={false} />;
```

### How to overwrite available properties for an element?

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

### Text element inputs

If you want to customize the toolbar for an `text` element, you can use some built-in inputs:

```js
import {
  FontFamilyInput,
  FontSizeInput,
  FontStyleGroup,
  FontColorInput,
  SpacingInput,
} from 'polotno/toolbar/text-toolbar';
```
