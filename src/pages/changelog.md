---
title: Changelog
hide_table_of_contents: true
---

### 0.12.0 -  2021-02-08

- `placeholder` attribute for `text` elements. Can be used to simulate `placeholder` attribute from DOM inputs.

### 0.11.3 -  2021-02-08

- Image crop fixes and fadeout effect for better UI

### 0.11.2 -  2021-02-04

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