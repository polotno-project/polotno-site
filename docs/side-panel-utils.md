---
title: Utils API
---

When building custom side panel you can use any React components you want. You can define your own from scratch.

But there is a very common use case to show a grid of the previews in the side panel. It can be preview of images, templates or other elements. For such scenario you can use `<ImagesGrid />` component.

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
  onSelect={async (image, pos, element, event) => {
    // image - an item from your array
    // pos - relative mouse position on drop. undefined if user just clicked on image
    // element - model from your store if images was dropped on an element.
    //    Can be useful if you want to change some props on existing element instead of creating a new one
    // event - will have additional data such as
    //      elements - list of all elements under the mouse
    //      page - page where user dropped the image
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
  // should we show a loading indicator at the end of the grid?
  isLoading={false}
  // load more will be called when user scrolled to the bottom of the list
  // you can request new data from your API there.
  // pass false if more data is not available
  loadMore={() => {}}
  // optional show special component at the bottom of every image element
  getCredit={(image) => <span>Photo by Anton</span>}
  // how many columns do we need? It actually should be called "columnsNumber"
  // we will rename it later
  rowsNumber={2}
  // optionally pass crossOrigin param for images
  crossOrigin="anonymous"
  // optionally pass height size of the image, by default it is "auto"
  itemHeight={'100px'}
  // if "error" is not falsy, grid will display an error message
  error={true}
/>;
```

### How to use `useInfiniteAPI` hook?

It is a common scenario to request some API to display a list of images in the side panel grid. You can use any React tools here. You can use `fetch` methods inside hooks, you can use any library for that. But also you can use `useInfiniteAPI` hook from `Polotno`. `useInfiniteAPI` hooks is just a wrapper around [swr](https://swr.vercel.app/) library.

```js
import { useInfiniteAPI } from 'polotno/utils/use-api';

export const SidePanel = () => {
  const { data, isLoading, loadMore, isReachingEnd, hasMore, reset, error } = useInfiniteAPI({
    // a function that will return a URL to request
    getAPI: ({ page, query }) => `https://example.com/api?page=${page}&query=${query}`,
    // default search query for the first call call
    defaultQuery = '',
    // timeout before making a new call when you change search query, useful for debouncing
    timeout = 500,
    // a function that should return number of pages available from the first API response
    // usually API response has a "totalPages", "size" or other field that tells you how many pages are available
    getSize = (firstResult) => firstResult.total_pages,
  });

  // data - is an array of responses from the API
  // each item in the array corresponds to a page

  // loadMore - function to be called when you want to request for more data
  // ImagesGrid will use it when you scrape the bottom of the list

  // isReachingEnd - true if you are at the end of the list

  // hasMore - true if you can request for more data
  // reset - function to be called when you want to reset the list
  // error - error object if something went wrong
});
```

## How to drop elements from side panel into workspace?

If you don't want to use `<ImagesGrid />` component, you have to implement drop&drop of DOM elements by yourself. However `polotno` has some tools to listen to drop event on the workspace. You can use this:

```js
import { unstable_registerNextDomDrop } from 'polotno/config';

// then in your components inside side panel you can do something like this:
<img
  draggable
  src={url}
  onDragStart={() => {
    registerNextDomDrop((pos, element) => {
      // "pos" - is relative mouse position of drop
      // "element" - is element from your store in case when DOM object is dropped on another element

      // you can just create new element on drop position
      // or you can update existing element
      // for example we can drop image from side panel into existing 'image' element in the workspace
      if (element && element.type === 'image') {
        // you can update any property you want, src, clipSrc, border, etc
        element.set({ src: url });
        return;
      }
      // or we can just create a new element
      store.activePage.addElement({
        type: 'image',
        src: url,
        x: pos.x,
        y: pos.y,
        width: 100,
        height: 100,
      });
    });
  }}
  onDragEnd={() => {
    registerNextDomDrop(null);
  }}
/>;
```
