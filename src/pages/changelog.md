---
title: Changelog
hide_table_of_contents: true
---

## Welcome to the change log of `Polotno`.

### 0.22.2 - 2021-06-03

- General bugs fixes

### 0.22.1 - 2021-06-02

- **New UI for "text" tab with templates**
- Center and middle align options
- Better snap on dragstart of unselected object

### 0.21.1 - 2021-05-28

- [Translation API](/docs/config#how-to-translate-ui)
- Lock button UI fixes

### 0.20.1 - 2021-05-27

- Add support for all google fonts. Now `polotno` will automatically load them. If you don't need them all you can always change that in https://polotno.dev/docs/config#how-to-change-available-fonts
- Fix canvas crashes on small images
- Added `polotno-side-panel-tab` class for some customizations

### 0.19.1 - 2021-05-25

- Scroll and UI hotfixes

### 0.19.0 - 2021-05-25

- New UI to control pages from the canvas. You can hide it if you want https://polotno.dev/docs/workspace#hide-page-controls
- Better PDF export with multiple pages in one file

### 0.18.10 - 2021-05-21

- Better crop behavior on `image` resize
- Fix crop on resize of SVG elements
- More basic shapes on elements tab
- Fix font preview when you upload new font
- Fix missing color replacement on `svg` elements
- Add some warnings for better key usages

### 0.18.9 - 2021-05-07

- Fixed image loading when svg is used as source
- Fixed `whenLoaded` detection for svg with color replaced
- Fixed selection on duplicate

### 0.18.8 - 2021-05-03

- Disable automatic image reloading
- Added a custom hook to overwrite image loading logic
- Smaller bundle size

### 0.18.7 - 2021-04-29

- Fix cross origin images loading

### 0.18.6 - 2021-04-26

- Better crop logic on image resize
- When image is failed to load, polotno will automatically retry to load it

### 0.18.5 - 2021-04-22

- Change font loading detector for the faster screen updating on the initial load

### 0.18.4 - 2021-04-22

- Fix incorrect export when an element is highlighted

### 0.18.3 - 2021-04-21

- Fix cursor jump on text edits
- Fix error throw in "elements" side panel

### 0.18.2 - 2021-04-20

- Better default crop behavior on image element resize
- Internal code optimizations

### 0.18.1 - 2021-04-09

- Quick fix for SVG colors detection

### 0.18.0 - 2021-04-09

- Simplify some semi-internal API usage
- Updated "Elements" panel with default shapes
- Show warning when `<Workspace />` component can't detect its size
- PDF base64 export
- Better snap when several objects are selected
- Internal updates of dependencies

### 0.17.0 - 2021-03-23

- Added `fontWeight` property for `text` elements. It can have any CSS `fontWeight` values
- `fontStyle` property of `text` element is slightly changed. It can accept only values "normal" or "italic"
- Added a warning when polotno can't export store to an image
- Better font loading check
- Some internal refactoring for better components reuse

### 0.16.0 - 2021-03-12

- **Breaking**. Fonts API is changed. Instead of `name` you should use `fontFamily`.

```js
// old:
store.addFont({ name: 'Troika', url: path });

// new:
store.addFont({ fontFamily: 'Troika', url: path });
```

- Fix performance issue for `image` elements. `Polotno` should consume a lot less CPU now.
- Multi-page work fixes
- Better zoom UX
- Better color control for text placeholder
- Fixes for upload button
- `jpg` image export
- Safer key validation flow

### 0.15.0 - 2021-03-03

- Zooming will try to keep canvas position
- More options for `lineHeight` property for `text` element. Now it should support all CSS values
- New border option for `image` and `svg` elements
- Several bugs fixes

### 0.14.2 - 2021-03-01

- Fix crop button hide on image element click
- Fix text blink on undo/redo
- `justify` align is temporary removed from toolbar of text elements
- added better loading indicators for image elements

### 0.14.1 - 2021-02-26

- **New Magic Resize feature**
- Better touch support
- Undo/redo fixes
- Better reset zoom function

### 0.13.1 - 2021-02-12

- Jumping fixes for crop action
- Fix undo/redo when several shapes are moved
- Fix some console warnings

### 0.13.0 - 2021-02-10

- Fix resize when several shapes are selected
- Highlight of elements on mouseover
- Putting cursor on correct position when text element is selected

### 0.12.1 - 2021-02-09

- Better undo/redo management. The "no change recorded" bug is fixed.
- Better crop UI on toolbar
- `custom` attribute for `page`
- some other small bugs fixes

### 0.12.0 - 2021-02-08

- `placeholder` attribute for `text` elements. Can be used to simulate `placeholder` attribute from DOM inputs.

### 0.11.3 - 2021-02-08

- Image crop fixes and fadeout effect for better UI

### 0.11.2 - 2021-02-04

- Fix undo/redo
- Text element editing fixes
- cancel/done crop buttons for image element
- Better shapes selection

### 0.11.0 - 2021-02-02

- Text resize fixes
- Image crop fixes
- Better drop from side panel to canvas
- Align elements fixes
- Less click to enter "edit mode" for `text` element

### 0.10.4 - 2021-01-27

- You can drag elements from side panel
- Better crop UX for `image` elements
- Fixed some crashes and bugs

### 0.10.1 - 2021-01-24

- New crop behavior on double click on the image. Very excited about it.
- `image` elements has also `cropWidth` and `cropHeight` properties.
- Added `Crop` button to the top toolbar.

### 0.9.0 - 2021-01-23

- **Possible breaking**: `image` elements has no `clipDirection` any more.
- **Possible breaking**: property `svgSource` for `svg` elements is renamed to `src`
- Cropping abilities by double click on image
- `cropX` and `cropY` properties for `image` elements. crop value should be from `0` to `1` and means % of original size
- SVG images will keep ratio on resize
- Various style fixes
- `hideOpacity` option for `<Toolbar />`

### 0.8.0 - 2021-01-21

- Text element resizing fixes
- `letterSpacing` and `lineHeight` attributes for text elements

### 0.7.3

- Some internal bugs fixes and stability improvements
- Some fixes for module exports names

### 0.7.0

- Many UI fixes for the toolbar

### 0.6.5

- Much better undo/redo implementation
- New `element.clone()` and `page.clone()` methods
- New `element.toJSON()` and `page.toJSON()` methods
- Added more hotkeys to `<Workspace>` component

### 0.6.2

- New filter - Sepia
- New filter - Grayscale
- Fixed ability to apply filters to images
- Added ability to set custom attributes to elements with `element.set({ custom: { metaInformation: 'my-data' }})`

### 0.5.3

- General bugs fixes and stability improvements

### 0.5.0

- New API for manipulating side panel components
- New API to change default Google Fonts list
- New API to change default upload behavior
- Performance and UI fixes for many side panel components

### 0.4.4

- Fix flip quality of SVG images
- Slightly change toolbar icons
- `store.deletePages(ids)` API
- pdf export fixes
- New button "fit image to background" in the toolbar
- `downloadButtonEnabled` prop for toolbar component

### 0.4.3

- Reduced bundle size
- Fixed "More" button on small screens when a text element is selected
- New loading indicators are added

### 0.4.1

- "Elements" from side panel are real SVG files now
- Fix "my fonts" add button to filter only font files
- Animate adding new elements on the canvas

### 0.4.0

- Ability to add custom font file from side panel
- new `store.addFont({ name, url })`, `store.removeFont(name)` and `await store.loadFond(name)` API.
- Brand new "Elements" panel on sidebar with https://iconscout.com/ search

### 0.3.1

- **Major upgrade for all internal dependencies.**. `polotno` should be used with `react@^17`. It may not work with `react@^16`.
- Sidebar UI - added ability to set custom sizes
- New Filter - Simple shadows
- Sidebar UI - fix scroll issues
- Sidebar UI - background color fixes, ability to set any background

### 0.3.0

- New property for all elements `opacity`. Add opacity button to the toolbar
- Added duplicate button to the toolbar
- `flipX` and `flipY` options for `image` and `svg` elements
- Added flip button to the toolbar
- Added more align and layering options
- General style fixes and improvements
- Better font loading

### 0.2.2

- Bug fix - better text editing from the canvas
- New sidebar panel - Upload!
- Collapsible toolbar for text (better support for smaller screens)

### 0.2.0

- New feature - locking. `element.set({ locked: true })`. Locked elements can't be changed from the canvas by an end user.
- New feature - `stroke` and `strokeWidth` for `Text` element.
- Better support for exports of multi-page projects.
- Bug fix - removing elements from the canvas by keyboard will work only on correct focus.
- Fix the bug with incorrect page focusing.
- Performance optimizations.
- Better dark theme support.
- Better text rendering and fonts load.

### 0.1.3

- Fixes for visual display of vector images

### 0.1.2

- Ready to use list of most popular canvas size
- Infinite scroll for images component
- Added more default fonts
- Images from the side bar are inserted with the correct size
- Add unsplash photos library
