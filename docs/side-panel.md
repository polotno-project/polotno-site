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

## How to customize side panel tabs?

You can pass `sections` property to `<SidePanel />` component to specify all available tabs manually. Here is the default UI:

```js
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel/side-panel';

const MyPanel = () => {
  return <div><SidePanel store={store} sections={DEFAULT_SECTIONS} /></div>;
}
```

And this is how you can define in manually:

```js
import { SidePanel } from "polotno/side-panel/side-panel";
// import existing section
import { TextSection } from "polotno/side-panel/side-panel";

// import default tab component
import { SectionTab } from "polotno/side-panel/tab-button";
// import our own icon
import FaShapes from "@meronex/icons/fa/FaShapes";

// define the new custom section
const CustomSection = {
  name: "custom",
  Tab: (props) => (
    <SectionTab name="Custom" {...props}>
      <FaShapes icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        <p>Here we will define our own custom tab.</p>
        <p>Elements on the current page: {store.activePage?.children.length}</p>
      </div>
    );
  })
};

// we will have just two sections
const sections = [CustomSection, TextSection];

const CustomSidePanel = () => {
  return <SidePanel store={store} sections={sections} defaultSection="custom" />
}
```

Demo:

<iframe
    src="https://codesandbox.io/embed/polotno-custom-side-panel-eyfbq?fontsize=14&hidenavigation=1&theme=dark&view=preview"
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


### How to set your own default page sizes?

With the same customization approach you can make your own panel for changing pages sizes:

```js
const AVAILABLE_SIZES = [
  { width: 500, height: 500 },
  { width: 1000, height: 1000 },
  { width: 1500, height: 1500 }
];

// define the new custom section
const СustomSizes = {
  name: "sizes",
  Tab: (props) => (
    <SectionTab name="Sizes" {...props}>
      <GiResize icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        {AVAILABLE_SIZES.map(({ width, height }, i) => (
          <Button
            key={i}
            style={{ width: "100%", marginBottom: "20px" }}
            onClick={() => {
              store.setSize(width, height);
            }}
          >
            {width}x{height}
          </Button>
        ))}
      </div>
    );
  })
};
```

Demo: https://codesandbox.io/s/polotno-custom-sizes-panel-hmq9h?file=/src/index.js


