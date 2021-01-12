---
title: Changelog
hide_table_of_contents: true
---

### 0.5.3

* General bugs fixes and stability improvements

### 0.5.0

* New API for manipulating side panel components
* New API to change default Google Fonts list
* New API to change default upload behavior
* Performance and UI fixes for many side panel components

### 0.4.4

* Fix flip quality of SVG images
* Slightly change toolbar icons
* `store.deletePages(ids)` API
* pdf export fixes
* New button "fit image to background" in the toolbar
* `downloadButtonEnabled` prop for toolbar component


### 0.4.3

* Reduced bundle size
* Fixed "More" button on small screens when a text element is selected
* New loading indicators are added

### 0.4.1

* "Elements" from side panel are real SVG files now
* Fix "my fonts" add button to filter only font files
* Animate adding new elements on the canvas

### 0.4.0

* Ability to add custom font file from side panel
* new `store.addFont({ name, url })`, `store.removeFont(name)` and `await store.loadFond(name)` API.
* Brand new "Elements" panel on sidebar with https://iconscout.com/ search

### 0.3.1

* **Major upgrade for all internal dependencies.**. `polotno` should be used with `react@^17`. It may not work with `react@^16`.
* Sidebar UI - added ability to set custom sizes
* New Filter - Simple shadows
* Sidebar UI - fix scroll issues
* Sidebar UI - background color fixes, ability to set any background

### 0.3.0

* New property for all elements `opacity`. Add opacity button to the toolbar
* Added duplicate button to the toolbar
* `flipX` and `flipY` options for `image` and `svg` elements
* Added flip button to the toolbar
* Added more align and layering options
* General style fixes and improvements
* Better font loading

### 0.2.2

* Bug fix - better text editing from the canvas
* New sidebar panel - Upload!
* Collapsible toolbar for text (better support for smaller screens)

### 0.2.0

* New feature - locking. `element.set({ locked: true })`. Locked elements can't be changed from the canvas by an end user.
* New feature - `stroke` and `strokeWidth` for `Text` element.
* Better support for exports of multi-page projects.
* Bug fix - removing elements from the canvas by keyboard will work only on correct focus.
* Fix the bug with incorrect page focusing.
* Performance optimizations.
* Better dark theme support.
* Better text rendering and fonts load.


### 0.1.3

* Fixes for visual display of vector images

### 0.1.2

- Ready to use list of most popular canvas size
- Infinite scroll for images component
- Added more default fonts
- Images from the side bar are inserted with the correct size
- Add unsplash photos library