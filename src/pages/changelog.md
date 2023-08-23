---
title: Changelog
hide_table_of_contents: true
---

## Welcome to the change log of `Polotno`.

### **1.13.0 - 2023-08-23**

- Changes logic in smart resize. It should work better now and keep layout of elements.
- Update "Resize" side panel. More options and better UX.

### **1.12.6 - 2023-08-06**

- Fix infinite loop for text background rendering
- Fix `fileName` argument for `store.saveAsHTML()`

### **1.12.5 - 2023-08-01**

- Fix `fileName` property for `store.saveAsGIF()` method
- Use different keys for `<ImagesGrid />`

### **1.12.4 - 2023-07-26**

- Ability to disable rotation snap when ctrl or meta key is pressed
- Little style changes of side panel.
- Add special class name `polotno-font-item` for uploaded font item in Text side panel

### **1.12.3 - 2023-07-19**

- Fix for bundled version

### **1.12.2 - 2023-07-18**

- Fix crashes on `line` elements usage

### **1.12.1 - 2023-07-13**

- Better export with `store.toHTML()`. Now it should NOT embed images into file. It will make output much smaller.
- Fix crashes in some cases

### **1.12.0 - 2023-07-13**

- New `store.clear()` method to purge all elements and pages from the store
- Remove some logs from the console

### **1.11.0 - 2023-07-11**

- **Alpha release of animations support. See [docs](/docs/animations) for more details.**
- Fetch function customization for `useInfiniteAPI`.
- Ability to change type labels in layers menu via translations

### **1.10.0 - 2023-06-22**

- Force mobile view when `polotno-mobile` class is added to the any parent container
- Update internal dependencies

### **1.9.9 - 2023-06-20**

- Fixes for "Position" button on the toolbar
- Fix for `page.setSize({ width, height })` API

### **1.9.8 - 2023-06-14**

- Fix vertical text resize
- Fix image drop from side panels

### **1.9.7 - 2023-06-05**

- Make rotate handle of transformer more beautiful
- Argument fixes for `onSelect` of `ImagesGrid` component

### **1.9.6 - 2023-05-22**

- Fix API to get image size to use `anonymous` mode for CORS images
- More data for `onSelect` callback for `<ImagesGrid />` component

### **1.9.5 - 2023-05-22**

- Show used fonts first in the font family dropdown
- Fix deselect of the element when you click on it with ctr or shift key pressed

### **1.9.4 - 2023-05-14**

- Fix render of text borders

### **1.9.2 - 2023-05-08**

- Some homework for video support

### **1.9.1 - 2023-04-21**

- Picker color from canvas on any color picker

### **1.8.7 - 2023-04-17**

- Update deps. May work a bit faster.

### **1.8.6 - 2023-04-13**

- Update dependencies
- Fix color format issues for `svg` element toolbar color change

### **1.8.5 - 2023-04-10**

- Fix text edit inside group
- Fix sidepanel size on mobile devices
- Change default background query
- Fixes for HTML text renderer

### **1.8.1 - 2023-03-22**

- Fix html display on text element edits

### **1.8.0 - 2023-03-22**

- Some homework for video support, but it is not ready yet

### **1.7.6 - 2023-03-13**

- Fixes for html text renderer
- Support for `line` and `group` elements in `store.toHTML()` method
- Better scrolling on `store.selectPage(id)` method

### **1.7.4 - 2023-03-01**

- Fix incorrect dragging when you try to move unselect child of a group
- Better line height control in the toolbar (it will not move line )

### **1.7.3 - 2023-02-26**

- Fixes for html text renderer

### **1.7.2 - 2023-02-27**

- Fix several downgrading bugs from previous version on resize of `image` element
- `page.setSize({ width, height })` API
- Fix text resizing with vertical resize is enabled

### **1.7.1 - 2023-02-24**

- Huge memory usage optimizations for `svg` elements.
- `line` elements fixes
- Fix `store.waitLoading()` indicator when you have `image` elements with `clipSrc` property

### **1.7.0 - 2023-02-21**

- **New element type `line`. You can use it for both lines and arrows!**
- Fix some typescript definitions
- Internal dependencies updates

### **1.6.4 - 2023-02-15**

- Slightly change label when you resize elements for better readability

### **1.6.3 - 2023-02-15**

- Some fixes for experimental HTML text renderer
- Better color picker for svg elements in the toolbar
- Fix bad background position on some mask elements

### **1.6.2 - 2023-02-07**

- More ruler fixes
- Huge improvements for `store.toHTML()` method
- Little ts fixes

### **1.6.1 - 2023-02-01**

- Rulers fixes
- Internal dependencies updates

### **1.6.0 - 2023-01-25**

- Show object size and rotation on transform
- Many fixes for rulers render
- Fix background effect for text with vertical align

### **1.5.0 - 2023-01-20**

- New "Background" effect for text elements. Cool and shy! Now all `text` elements have additional properties `backgroundEnabled`, `backgroundColor`, `backgroundOpacity`, `backgroundCornerRadius`, `backgroundPadding`.
- **Very experimental** `store.toHTML()` export.
- Fix letter spacing on text edits
- Fix non-working redo via keyboard
- Fix `italic` button work when several text elements are selected
- Fix strikethrough when text has gradient
- Change dragging flow on mobile. You need to select element first, then drag it.

### **1.4.4 - 2023-01-12**

- New strike style button for `text` elements
- Fix align top when several elements are selected
- `onKeyDown` property for `<Workspace />` component to overwrite default keydown handler
- API to control preset colors in the color picker. See configs docs [here](/docs/config).
- Fix locking button for groups in "Layers" menu
- new property `keepRatio` for `image` elements.

### **1.4.2 - 2023-01-04**

- Hotfix to resolve incorrect locking behavior

### **1.4.1 - 2023-01-02**

- **New feature!** Groups! You can now group elements together and move them as one. To group elements, select them and click on the "Group" button in the toolbar. To ungroup elements, select a group and click on the "Ungroup" button in the toolbar. You can also use `store.groupElements(ids)` and `store.ungroupElements(ids)` methods. Grouping features is not fully finished. I expect to have many updates to grouping API.
- New property `resizable` for elements. You can now disable resizing for some elements. Previously `draggable` property was used for that, but it was confusing. Now `draggable` is used only for moving and rotating elements and `resizable` is used for resizing elements.
- New property `removable` for elements. You can now disable removing elements from the canvas via UI or hotkeys.
- Copy/Paste from page one into another page will not offset elements position.
- Position button on the toolbar will work relative to active page size. Previously it was relative to the whole store size.
- Position button on the toolbar will now move elements relative to each other, if several elements are selected.
- `store.toPDFDataURL()` and `store.saveAsPDF()` now supports new argument `pageIds` to specify which pages should be exported.
- Fix `NaN` values issues in width and height inputs in the Resize side panel.
- Fix color updates in linear gradient color picker
- Added API to control history button in the toolbar.
- Fix `justify` align for experimental HTML text renderer
- Fix horizontal resize for experimental HTML text renderer

### **1.3.1 - 2022-11-24**

- Gradients now may have several colors and you can change their position.

### **1.2.5 - 2022-11-21**

- Little UI fixes
- Fix incorrect resize for HTML text renderer

### **1.2.4 - 2022-11-09**

- Optimize Polotno for iOS Safari usage
- Fix touchpad zooming
- Add numeric input for Corner Radius attribute in Filters menu
- Reactive flow for `setGoogleFonts` function

### **1.2.3 - 2022-11-02**

- Fix incorrect svg display for some files
- Fix many crashes across the app

### **1.2.2 - 2022-10-28**

- Smoother scrolling when design has many pages
- Fixed incorrect scroll position, when you select page via API
- Set default `crossOrigin` to `anonymous` for `<ImagesGrid />` component
- Fix icon centering in side panel

### **1.2.1 - 2022-10-24**

- Performance improvements. Projects with many pages and many large images should work much faster.
- New translations for the toolbar.

### **1.2.0 - 2022-10-17**

- Linear gradient support for fill of text elements
- Fix bug on incorrect export while user is editing text
- Ignore "placeholder" text elements in export
- Fix incorrect console warnings on PASTE action
- Fix color picker icon in "background" side panel
- Clipboard now preserves order of selected elements
- Clipboard now works across multiple browser's tabs
- Tooltip fixes in the toolbar (showing on bottom)
- Fix cloning of SVG elements when they have `cornerRadius` property

### **1.1.1 - 2022-10-07**

- New `bleedColor` optional property for `<Workspace />` component
- Enabled corner radius control in filters for `svg` elements

### **1.1.0 - 2022-09-29**

- Show elements outside of page bounding box. Make them selectable.
- `page.background` now supports base64 data urls.

### **1.0.0 - 2022-09-26**

- New API to replace specific inputs in the toolbar. See [Toolbar](/docs/toolbar) page for more details.
- Better crop defaults when images is replaced with drag&drop from side panel
- Deleting elements with API shouldn't deselect all elements
- UI fix for unknown Google fonts

### 1.0.0-18 - 2022-09-21

- Replace default assets provider in "Elements" side panel. Now it will use Noun project.

### 1.0.0-17 - 2022-09-20

- Fixes on experimental html text rendering
- New API methods to control global fonts

### 1.0.0-15 - 2022-09-16

- Fix loading of some SVG images in firefox

### 1.0.0-14 - 2022-09-15

- Fixes for better mobile support

### 1.0.0-11 - 2022-08-29

- Experimental `unstable_setTextOverflow` API. Usage:

```js
import { unstable_setTextOverflow } from 'polotno/config';

// default behavior. when height of the text element doesn't fit the text, it will be resized
unstable_setTextOverflow('resize');
// when height of the text element doesn't fit the text, it will be cropped
unstable_setTextOverflow('ellipsis');
// when height of the text element doesn't fit the text, it will reduce its font size
unstable_setTextOverflow('change-font-size');
```

### 1.0.0-10 - 2022-08-26

- Several rendering fixes for `text` elements, font change and dragging should be smoother
- Added `hideImageRemoveBackground` for `Toolbar` component
- Internal dependencies update

### 1.0.0-9 - 2022-08-24

- Fix `ignoreBackground` option on exports
- `store.loadJSON()` optimizations

### 1.0.0-8 - 2022-08-09

- Assets loading optimizations
- Fix incorrect export when design has many pages
- Small UI improvements

### 1.0.0-5 - 2022-08-04

- **Possibly Breaking**: `svgElement.colors` getter is removed. This change should not effect most of polotno application.
- Large optimization when a document has many pages with svg elements.
- Internal dependencies updated

### 1.0.0-3 - 2022-07-19

- Increase limit on "stroke size" limit for `text` elements.

### 1.0.0-2 - 2022-07-19

- Fixes in `useInfiniteAPI` hook and `<ImagesGrid />` component. Loading of images in side panel should work smoother now. With less request and better loading indicator.

### 1.0.0-1 - 2022-07-11

This release is preparation for upcoming release 1.0.0.

- **BREAKING CHANGE**: `Polotno` now requires `react@18` and `react-dom@18`. This is a breaking change because it means that the `Polotno` library will no longer work with older versions of React. To update the dependencies correctly you should go to `package.json` and update following packages:

```json
"polotno": "^1.0.0-1",
"react": "^18.2.0",
"react-dom": "^18.2.0",
```

Then run `npm install` to update the dependencies.

- Rulers. Toggle them with `store.toggleRulers()`.
- More shadow options
- Public API for bleeds. `store.activePage.set({ bleed: 20 })` to set bleed. `store.toggleBleed()` to show it on the workspace
- Use ctrl/meta + wheel to quickly zoom in/out workspace
- New element attributes `draggable`, `contentEditable` and `styleEditable`. These attributes are replacing `locked` attribute with more control.
- Fixes for export with bleed
- Fix text jumping on resize

### 0.43.15 - 2022-06-29

- Support from custom fonts in experimental HTML text renderer

### 0.43.13 - 2022-06-29

- Dependency fixes and updates

### 0.43.12 - 2022-06-26

- Fixes for better RTL support
- Typescript fixes

### 0.43.10 - 2022-06-13

- Ability to hide font family selector from toolbar
- Better support for RTL languages in html renderer
- Minor UI fixes

### 0.43.9 - 2022-06-08

- Fix text editing bug in Firefox
- Better support for RTL languages

### 0.43.6 - 2022-06-04

- Fix failed export on some browsers
- Fix export when background is transparent

### 0.43.5 - 2022-06-01

- Add transparent option in default list of background colors
- Fix incorrect behavior on horizontal text resize
- "Fit to page" button for `image` element will reset cropping

### 0.43.3 - 2022-05-26

- Fix possible failure on color replace with gradients
- Update internal dependencies

### 0.43.2 - 2022-05-24

- Fix color replace function in some SVG icons
- Fix new line bug for `text` elements
- "Text" side panel will create `text` elements with relative size depending on the canvas size

### 0.43.1 - 2022-05-18

- Experimental support for vertical resize and align for `text` elements. https://polotno.com/docs/vertical-text-resize
- Fixes for html text rendering.
- Internal dependencies updated

### 0.42.8 - 2022-04-11

- HTML text rendering fixes

### 0.42.7 - 2022-04-05

- Smooth font changes. Text should not jump now
- Fix `showInExport: false` for `text` elements
- Better font loading handling. Some fonts should load faster
- Multi-select elements on the `Layers` menu with shift or ctrl

### 0.42.6 - 2022-04-06

- Remove non-selectable elements from "Layers" menu
- Strip HTML tags from simple `text` element display
- Pasting several elements on the canvas will automatically select them all

### 0.42.5 - 2022-04-01

- Reverse order in "Layers" menu
- Quick input fix in fonts selector for `text` element. Blurring the the input will work better.

### 0.42.3 - 2022-04-01

- Better distance display when several elements selected
- "Select All" will skip non-selectable elements
- Fix distance display on ALT key usage
- Fix loading of the same template several times into multi-page document
- Increase loading time limit. It will prevent false loading errors and may improve exporting.

### 0.42.1 - 2022-03-22

- **New!** `Polotno` now supports real metric units. Usage: `store.setUnit({ unit: 'mm', dpi: 300 })`. https://polotno.com/docs/store-overview#storesetunit-unit-dpi-
- UX fixes in "Layers" menu
- **Breaking! Polotno is migrated to use blueprint v4 internally.**

Steps to migrate:

1. Change CSS styles to new version:

```html
<link
  href="https://unpkg.com/@blueprintjs/icons@4/lib/css/blueprint-icons.css"
  rel="stylesheet"
/>
<link
  href="https://unpkg.com/@blueprintjs/core@4/lib/css/blueprint.css"
  rel="stylesheet"
/>
<link
  href="https://unpkg.com/@blueprintjs/popover2@1/lib/css/blueprint-popover2.css"
  rel="stylesheet"
/>
```

2. If you have any additional UI made for blueprint v3, you must migrate it to v4: https://github.com/palantir/blueprint/wiki/Blueprint-4.0.

### 0.41.5 - 2022-03-17

- **New "Layers" menu in the side panel.** https://polotno.com/blog/2022-04-18-new-layers-panel
- Ability to customize "Download" button in the toolbar https://polotno.com/docs/toolbar/#how-to-overwrite-download-button
- Ability to customize `<Workspace />` component for the case of no pages. https://polotno.com/docs/workspace#no-pages-ui

### 0.40.0 - 2022-03-09

- Fix pdf export when background has alpha channel
- Ability to drop an image from side panel to another image to replace it
- "Fit to page" function for images will handle bleed correctly
- Different small bugs fixes

### 0.39.9 - 2022-02-28

- UI bugs fixes when bleed is used

### 0.39.5 - 2022-02-23

- Better work for ordering of elements when several items are selected
- Fix loading detector for `svg` elements. It should fix export for documents with many pages.
- Fixed undo function when `svg` element is added to the document.

### 0.39.3 - 2022-02-15

- Fix bug in filters for `image` elements
- Faster project loading
- Faster PDF export

### 0.39.2 - 2022-02-10

- **Collapsible side panel**
- "Templates" panel updates. Not it can load a template into current page of multi-page document.
- Better error handling for most of default side panels.
- Minor UI updates for Zoom Panel.
- Fix display bug of Zoom Panel in Safari.
- Optimize network loading of "Templates Panel"
- Other small fixes...

### 0.38.1 - 2022-01-28

- `store.history.ignore` fixes
- Better UX when remove background function is failed

### 0.38.0 - 2022-01-28

- Show distance between elements. To see it select one element, then hold ALT/OPTION key and hover another element
- Enable "Remove background" feature for all Enterprise plan users
- Better guidelines when you drag an element. Now it can show several lines at the same time
- Change default search query in "Photos" section. Now it will show last photos from unsplash
- Option to disable image downscaling to improve performance
- More options in translations
- Style fixes
- Fix Polotno build in `react-scripts@5`

### 0.37.6 - 2022-01-11

- Update all internal dependencies to their latest versions.
- Fixes for experimental html text renderer.

### 0.37.5 - 2022-01-07

- PDF export fixes. It should work faster, produce smaller file size and render correctly in some PDF viewers.

### 0.37.4 - 2022-01-06

- Ability to edit several text elements at once from toolbar.
- Couple fixes for JSON import/export

### 0.37.3 - 2021-12-23

- Change opacity UI a bit. Add numeric input.
- Export fixes for designs with bleed

### 0.37.1 - 2021-12-15

- Ability to set different `width` and `height` for every page
- Better `bleed` support
- Ability to customize page controls in `<Workspace />`
- Small fixes

### 0.36.9 - 2021-12-09

- Fix `<Workspace />` autoresize logic
- Update zooming button

### 0.36.8 - 2021-12-09

- Selection fixes
- Text highlight fixes

### 0.36.6 - 2021-12-02

- Fix a bug with possible stuck in loading state, should fix issues with export
- New property `page.bleed`.

### 0.36.5 - 2021-11-23

- Fix image rendering in Safari

### 0.36.3 - 2021-11-22

- **BREAKING:** `store.toDataURL()` is now async method. Use it as a promise or with `await` keyword.
- Improve performance when design has many changes
- Better quality on image downscale
- Fixes for `store.on('change', callback)` method. It should not have false triggers.

### 0.35.1 - 2021-11-16

- Change internal dependency of `nanoid` to fix Codesandbox issue.

### 0.35.0 - 2021-11-15

- Allow snapping on element resize
- Improve dragging performance
- Fix highlight on text resize

### 0.34.8 - 2021-11-05

- Better resizing of `<Workspace />` when size of the store is changed
- Fix `store.waitLoading()` for mask property on `svg` elements

### 0.34.6 - 2021-11-01

- Fix wrong image display when it has both corner radius and border
- Better positioning of pages in workspace
- Better highlight of elements on selection. No you can see border around every selected element.
- `visible` property for every element.

### 0.34.5 - 2021-10-26

- Add more translations for `<Workspace />` component
- Fix possible crash in `store.deletePages()` method

### 0.34.4 - 2021-10-25

- Improve color picker performance
- Fix issue scroll of workspace jumped after page deleting
- Skip drop functions from sidepanel into locked object

### 0.34.3

- Rich text renderer fixes
- New property `hideSvgEffects` for `<Toolbar />` component

### 0.34.1

- Add `justify` align for `text` element
- Fix crashes on some cases of JSON import
- Experimental rich renderer for `text` element to support different style options inside one text element

```js
import { unstable_useHtmlTextRender } from 'polotno/config';
unstable_useHtmlTextRender(true);

store.activePage.addElement({
  type: 'text',
  text: 'Polotno is a <span style="color: red;">red</span> and <strong>bold</strong> framework!',
  fontSize: 60,
  width: 400,
});
```

### 0.33.2

- Add `pageBorderColor` and `activePageBorderColor` props for `<Workspace />`
- Open unsplash links on a new tab
- Remove automatic element selection with element has `selectable: false`.
- Add more translations

### 0.33.1 - 2021-09-30

- Fix `<Workspace />` unmount fail

### 0.33.0 - 2021-09-29

- **new experimental `admin` mode to work with the design `store.setRole('admin')`. This mode will add additional controls in the toolbar to change some attributes of elements.**
- New `selectable` property for all elements. When `selectable: false` element is "invisible" for user's clicks. "admin" role can still select such elements
- New property `alwaysOnTop` for all elements
- new property `showInExport` for all elements.
- Hold `ctrl` or `command` button to disable snap on drag
- New hotkeys `ctrl+c`, `ctrl+v`, `ctrl+x`, `ctrl+a` to work on the workspace
- Fix `store.loadJSON()` function. It was not working correctly when an element has `0` in `x` or `y` attribute
- Fix `<Workspace />` auto-resize behavior. Now it is using `ResizeObserver` to adopt its size.
- New prop `backgroundColor` for `<Workspace />` component
- Better toolbar for `image` element. Now it will get shorter if no space available.
- Various bugs fixes

### 0.32.5 - 2021-09-20

- Fix export quality of some elements
- Better PDF export
- new method `store.setElementsPixelRatio(ration)`

### 0.32.3 - 2021-09-15

- Fix incorrect styles when text is under edit mode

### 0.32.2 - 2021-09-15

- Experimental support for Background Removing function

```js
import { unstable_setRemoveBackgroundEnabled } from 'polotno/config';

unstable_setRemoveBackgroundEnabled(true);
```

### 0.31.7 - 2021-09-08

- Several quick fixes for rendering and opacity changes

### 0.31.6 - 2021-09-08

Technical release with internal bugs fixes and optimizations

- Optimizing memory usage
- Fix Firefox crashes on some clipping cases
- Fix Firefox rendering bugs

### 0.31.5 - 2021-09-02

- Fix `<Workspace />` crashes when it is mounted inside too small area
- Update all internal dependencies.
- Change highlighting of active page

### 0.31.3 - 2021-08-30

- `image` element clipping with `clipSrc` property
- Fixes for some side panel components API requests
- Performance fixes
- Better scrollbar for `<Workspace />` component

### 0.30.1 - 2021-08-23

- Several hot fixes

### 0.30.0 - 2021-08-23

- Crash fixes for `image` and `svg` elements
- API to control opened side panel.

### 0.29.0 - 2021-08-19

- Updated **Templates** side panel. Added search for templates.
- [Configurable API endpoints](/docs/server-api).

### 0.28.0 - 2021-08-10

- New property `cornerRadius` for `image` elements
- Better typescript support

### 0.27.0 - 2021-07-30

- **Experimental masking for `svg` elements.** Usage: `svgElement.set({ maskSrc: imageURL })`. For now you can't control cropping behavior of image. It will be automatically centered.
- New global fonts API. For more info take a look into [Fonts Tutorial](/docs/config#how-to-change-available-fonts).
- You can keep previous undo history when you import json. Usage `store.loadJSON(json, true)`.

### 0.26.2 - 2021-07-22

- Fix `ColorPicker` component crash when it has not access to `store`.

### 0.26.1 - 2021-07-20

- Hot fix for gradient crash

### 0.26.0 - 2021-07-20

- **New gradient options for SVG element colors!**
- Color pickers now suggest colors to reuse from the store
- Some mobile UX fixes
- Fix "fit to background" resize bug when image has filters
- `getGoogleFontsListAPI` and `getGoogleFontImage` API. Details in [Configuration](/docs/config).
- Fix weird behavior of filters inputs in the toolbar
- Better dark theme support for color picker

### 0.25.7 - 2021-07-08

- Fix mobile issues
- Autofix of bad data on import

### 0.25.5 - 2021-07-08

- Several style fixes.

### 0.25.3 - 2021-07-07

- UI fixes and internal updates. **You will need to add additional styles into your webpage**:

```html
<link
  href="https://unpkg.com/@blueprintjs/popover2@1/lib/css/blueprint-popover2.css"
  rel="stylesheet"
/>
```

- **Experimental mobile layout for Polotno!** In order to make it work automatically, you need to use special containers. See [UI components docs](/docs/overview#ui-components) for samples.

### 0.24.6 - 2021-07-02

- Various hot fixes: better loading indicator, fix infinite templates loading, fix js error on object drop

### 0.24.3 - 2021-07-01

- Drop API for `<ImagesGrid />` and side-panel. See (SidePanel Docs)[/docs/side-panel#how-to-use-imagesgrid--component].
- Fix `polotno` crash on some data
- Better templates loading on side panel

### 0.24.2 - 2021-06-25

- Better UI for size panel
- Font loading fixes

### 0.24.1 - 2021-06-20

- Quick fix for possible crashes of `<ImagesGrid />` components in the side panel

### 0.24.0 - 2021-06-18

- **New Templates side panel**
- PDF export file size optimizations
- Improve SVG elements quality
- Better typescript support

### 0.23.0 - 2021-06-10

- Search in Background tab
- Add a warning when a font is not loading

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
