---
title: Side Panel
---

`SidePanel` provides default set of components for adding new elements into the canvas, changing pages sizes, etc.

```js
import { SidePanel } from 'polotno/side-panel';

const MyPanel = () => {
  return (
    <div>
      <SidePanel store={store} />
    </div>
  );
};
```

The `SidePanel` will automatically take full width and height of its parent. So you don't have adjust its size manually. You can just setup the size of parent `<div>` with CSS.

## How to customize side panel tabs?

You can pass `sections` property to `<SidePanel />` component to specify all available tabs manually. Here is the default UI:

```js
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';

const MyPanel = () => {
  return (
    <div>
      <SidePanel store={store} sections={DEFAULT_SECTIONS} />
    </div>
  );
};
```

And this is how you can define in manually:

```js
import { observer } from 'mobx-react-lite';
import { SidePanel } from 'polotno/side-panel';
// import existing section
import { TextSection } from 'polotno/side-panel';

// import default tab component
import { SectionTab } from 'polotno/side-panel';
// import our own icon
import FaShapes from '@meronex/icons/fa/FaShapes';

// define the new custom section
const CustomSection = {
  name: 'custom',
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
  }),
};

// we will have just two sections
const sections = [CustomSection, TextSection];

const CustomSidePanel = () => {
  return (
    <SidePanel store={store} sections={sections} defaultSection="custom" />
  );
};
```

Demo:

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-custom-side-panel?fontsize=14&hidenavigation=1&theme=dark&view=preview"
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
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import { Button } from '@blueprintjs/core';
import { GiResize } from "react-icons/gi";

const AVAILABLE_SIZES = [
  { width: 500, height: 500 },
  { width: 1000, height: 1000 },
  { width: 1500, height: 1500 },
];

// define the new custom section
const СustomSizes = {
  name: 'sizes',
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
            style={{ width: '100%', marginBottom: '20px' }}
            onClick={() => {
              store.setSize(width, height);
            }}
          >
            {width}x{height}
          </Button>
        ))}
      </div>
    );
  }),
};
```

### How to load custom photos?

Demo: Demo: https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-load-custom-images

We can write another custom panel that will load images from any API:

```js
import { observer } from 'mobx-react-lite';
export const PhotosPanel = observer(({ store }) => {
  const [images, setImages] = React.useState([]);

  async function loadImages() {
    // here we should implement your own API requests
    setImages([]);

    // wait to emulate network request
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // for demo images are hard coded
    // in real app here will be something like JSON structure
    setImages([
      { url: './carlos-lindner-zvZ-HASOA74-unsplash.jpg' },
      { url: './guillaume-de-germain-TQWJ4rQnUHQ-unsplash.jpg' },
    ]);
  }

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: '20px',
        }}
      />
      <p>Demo images: </p>
      {/* you can create yur own custom component here */}
      {/* but we will use built-in grid component */}
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos) => {
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: 'image',
            src: image.url,
            width,
            height,
            x: pos?.x || 0,
            y: pos?.y || 0,
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});
// define the new custom section
const СustomPhotos = {
  name: 'photos',
  Tab: (props) => (
    <SectionTab name="Photos" {...props}>
      <MdPhotoLibrary />
    </SectionTab>
  ),
  Panel: PhotosPanel,
};
```
