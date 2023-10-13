---
title: Toolip UI
---

`Tooltip` is a UI components similar to [Toolbar](/docs/toolbar), to change elements on the canvas, reorder and align them. Toolip is not fixed and will be rendered near selected elements.

![Tooltip image](/img/tooltip.png)

### How to customize Tooltip?

Similar to [Toolbar](/docs/toolbar), Tooltip supports special `components` property to add/change/remove most of its UI components.

To do that you need pass a component with a name in format `TypeName`, where type refer to `type` of element. For example `TextFill`. You can use all built-element types as `Text`, `Image`, `Svg`. But also you can use `Many` prefix when several elements are selected. Also you can define your own new components for any element type. E.g. `ImageAlertButton`

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-tooltip" target="_blank">Open Demo</a></p>

```js
import { observer } from 'mobx-react-lite';
import Toolbar from 'polotno/toolbar/toolbar';
import Workspace from 'polotno/canvas/workspace';
import { Tooltip } from 'polotno/canvas/tooltip';
import { observer } from 'mobx-react-lite';

const MyColorPicker = observer(({ store, element, elements }) => {
  // store - main polotno store object
  // elements - array of selected elements. The same as store.selectedElements
  // element - first selected element. The same as store.selectedElements[0]
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
      <Workspace
        store={store}
        components={{
          Tooltip,
          TextFill: MyColorPicker,
        }}
      />
    </div>
  );
};
```

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-tooltip?fontsize=14&hidenavigation=1&theme=dark&view=preview"
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

## How to disable Tooltip?

You can pass `Tooltip` component that renders `null` to disable it.

```js
import Toolbar from 'polotno/toolbar/toolbar';
import Workspace from 'polotno/canvas/workspace';

const Tooltip = () => null;

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
      <Workspace store={store} components={{ Tooltip }} />
    </div>
  );
};
```
