---
title: Units and Measures
---

### What metrics are using in Polotno?

By default Polotno is using CSS `pixels` as units with `1pt = 1px` and 72dpi. Everything you see in the `store` is in `pixels`. Like `width`, `height` or `fontSize`.
Polotno will use this values in UI.

You can change units displayed in the `store` using `setUnits` method.

```js
store.setUnit({
  unit: 'mm', // mm, cm, in, pt, px
  dpi: 300,
});
```

### How to display units in custom UI?

Also you can use special functions to convert units to pixels and back:

```js
import { pxToUnitRounded, unitToPx, pxToUnit } from 'polotno/utils/unit';

// convert 100 pixels to mm with 300 DPI
var mm = pxToUnit({
  px: 100,
  unit: 'mm',
  dpi: 300,
});

// do the same, but with 2 digits rounding, so number doesn't look ugly long in UI
var mm = pxToUnitRounded({
  px: 100,
  unit: 'mm',
  precious: 2,
  dpi: 300,
});

// convert 30 mm to pixels with 300 DPI
var pixels = unitToPx({
  unit: 'mm',
  dpi: 300,
  unitVal: 30,
});
```

### Exports and DPI

When you export your design into PDF, `polotno` will use 72 PDI to determine the size of the exported pages. If you increase just the `dpi`, it will not change quality of the exported PDF. It will just produce a PDF file will smaller page sizes. You have two options to increase quality of your exported designs:

1. First you can change DPI and change all pixels values in the store.
2. Or you can use hight `pixelRatio` attribute when you do the export.
