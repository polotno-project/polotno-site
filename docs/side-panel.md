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

## How to set your own default page sizes?

With the same customization approach you can make your own panel for changing pages sizes:

```js
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import { Button } from '@blueprintjs/core';
import { GiResize } from 'react-icons/gi';

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

## How to load custom photos?

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-load-custom-images" target="_blank">Open Demo</a></p>

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
        onSelect={async (image, pos, element) => {
          // image - an item from your array
          // pos - relative mouse position on drop. undefined if user just clicked on image
          // element - model from your store if images was dropped on an element.
          //    Can be useful if you want to change some props on existing element instead of creating a new one
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

## How to implement "hidden" side panel?

You can implement side panel in a way, that it is visible only in various situations, such as element selection.

Demo: https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-open-side-panel-programmatically

```js
// define the new custom section
const CustomSection = {
  name: 'custom-text',
  // we don't need "Tab" property, because it will be hidden from the list
  visibleInList: false,
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const text = store.selectedElements[0]?.text;
    return (
      <div>
        <InputGroup
          value={text}
          onChange={() => {
            store.selectedElements[0].set({ text: e.target.value });
          }}
        />
      </div>
    );
  }),
};

// add new section to side bar
const sections = [...DEFAULT_SECTIONS, CustomSection];

// use mobx API to react to selection changes
autorun(() => {
  const textSelected = store.selectedElements[0]?.type === 'text';
  if (textSelected) {
    store.openSidePanel('custom-text');
  }
});

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
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

## How to use `<ImagesGrid />` component?

`<ImagesGrid />` is a React component that:

- Displays an array of any items as images
- Supports infinite scrolling API
- Supports drag&drop from side panel into canvas

```js
import { ImagesGrid } from 'polotno/side-panel/images-grid';

<ImagesGrid
  // pass an array of items that have any image information
  images={[{ url: 'example.png' }, { url: 'example.png' }]}
  // a function to get image URL from an item of the array
  getPreview={(item) => item.url}
  // this function will be called when user is clicked on image or dragged it into canvas
  onSelect={async (image, pos, element) => {
    // image - an item from your array
    // pos - relative mouse position on drop. undefined if user just clicked on image
    // element - model from your store if images was dropped on an element.
    //    Can be useful if you want to change some props on existing element instead of creating a new one
    const width = 100;
    const height = 100;

    const x = (pos?.x || store.width / 2) - width / 2;
    const y = (pos?.y || store.height / 2) - height / 2;
    store.activePage?.addElement({
      type: 'image',
      src: image.url,
      width,
      height,
      x,
      y,
    });
  }}
  // should we should loading indicator at the end?
  isLoading={false}
  // load more will be called when user scrolled to the bottom of the list
  // you can request new data from your API there.
  loadMore={() => {}}
  // show special component at the bottom of every image element
  getCredit={(image) => <span>Photo by Anton</span>}
  // how many columns do we need? It actually should be called "columnsNumber"
  // we will rename it later
  rowsNumber={2}
/>;
```

## How to drop elements from side panel into workspace?

If you don't want to use `<ImagesGrid />` component, you have to implement drop&drop of DOM elements by yourself. However `polotno` has some tools to listen to drop event on the workspace. You can use this:

```js
import { unstable_registerNextDomDrop } from 'polotno/config';

// then in your components inside side panel you can do something like this:
<img
  draggable
  onDragStart={() => {
    registerNextDomDrop((pos, element) => {
      // here you can do you logic
      // probably you want to create element on the canvas
      // "pos" - is relative mouse position of drop
      // "element" - is element from your store in case when DOM object is dropped on another element
    });
  }}
  onDragEnd={() => {
    registerNextDomDrop(null);
  }}
/>;
```
