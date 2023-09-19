---
title: Custom elements
---

Custom elements allows you to create your own shapes and add them to the canvas.

By design `polotno` support several main types of elements: `text`, `image`, `svg`, `line`, `group`. In some cases you may want to create your own custom elements.

**THIS PAGE IS ABOUT VERY EXPERIMENTAL FEATURES OF POLOTNO!**

**Please use it carefully. Watch [changelog](/changelog) for any changes!**

Before you start, please note that:

1. Custom elements are not supported in [Cloud Render API](/docs/cloud-render).
2. By default [polotno-node](/docs/server-side) (for backend rendering) does not support custom elements. But with some [extra configuration](https://github.com/polotno-project/polotno-node#your-own-client) you can make it work.
3. You will need to know some Polotno internals to support animations for custom elements. Please write us if you need need help.
4. In the future there will be more options for design export (e.g. to SVG, print-ready PDF, etc). You will need to write some adopters to make it work with custom elements.
5. There are **NO** plans to remove this API in the near future.
6. If possible, try to use built-in elements. For example you can draw some complex shapes using `svg` element (you can generate src in the runtime).

## How to create custom shapes with Polotno?

As the demonstration we will create a custom `star` element.

Demo: https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-custom-element

Creating new elements consists of three main steps.

### 1. Create model for your element

First we need to define additional attributes for our new element. Very basic attributes such as `id`, `x`, `y`, `rotation`, all filters attributes, etc are already defined. So we just need to define additional data and default values.

```js
import { unstable_registerShapeModel } from 'polotno/config';

unstable_registerShapeModel({
  type: 'star',
  radius: 100,
  fill: 'black',
  numPoints: 6,
});
```

Now `polotno` store knows that we can define `star` model.

### 2. Create react component for new element

Then we need to define how to display our model. In order to do that we need to create react component with `react-konva` shapes.

```js
// polotno is made with mobx library
// we will need its tools to make reactive components
import { observer } from 'mobx-react-lite';
// import Konva components
import { Star } from 'react-konva';

import { unstable_registerShapeComponent } from 'polotno/config';

// now we need to define how elements looks on canvas
export const StarElement = observer(({ element, store }) => {
  const ref = React.useRef(null);

  const handleChange = (e) => {
    const node = e.currentTarget;
    const scaleX = node.scaleX();
    // Konva.Transformer is changing scale by default
    // we don't need that, so we reset it back to 1.
    node.scaleX(1);
    node.scaleY(1);
    // and then save all changes back to the model
    element.set({
      x: node.x(),
      y: node.y(),
      rotation: e.target.rotation(),
      radius: element.radius * scaleX,
    });
  };

  // VERY IMPORTANT note!
  // element.x and element.y - must define top-left corner of the shape
  // so all position attributes are consistent across all elements
  return (
    <Star
      ref={ref}
      // remember to use "element" name. Polotno will use it internally to find correct node
      name="element"
      // also it is important to pass id
      // so polotno can automatically do selection
      id={element.id}
      x={element.x}
      y={element.y}
      fill={element.fill}
      offsetX={-element.radius}
      offsetY={-element.radius}
      rotation={element.rotation}
      opacity={element.opacity}
      draggable={!element.locked}
      outerRadius={element.radius}
      innerRadius={element.radius * 0.5}
      onDragMove={handleChange}
      onTransform={handleChange}
    />
  );
});

// now we can register new component to draw our star
unstable_registerShapeComponent('star', StarElement);
```

### 3. Create custom top toolbar (optional)

Also we can define a custom toolbar to change star properties.

```js
import React from 'react';
import { observer } from 'mobx-react-lite';
import { NumericInput, Navbar, Alignment } from '@blueprintjs/core';

import ColorPicker from 'polotno/toolbar/color-picker';
import { unstable_registerToolbarComponent } from 'polotno/config';

const StarToolbar = observer(({ store }) => {
  const element = store.selectedElements[0];

  return (
    <Navbar.Group align={Alignment.LEFT}>
      <ColorPicker
        value={element.fill}
        onChange={(fill) =>
          element.set({
            fill,
          })
        }
        store={store}
      />
      <NumericInput
        onValueChange={(radius) => {
          element.set({ height: radius });
        }}
        value={element.radius}
        style={{ width: '50px', marginLeft: '10px' }}
        min={1}
        max={40}
      />
    </Navbar.Group>
  );
});

unstable_registerToolbarComponent('star', StarToolbar);
```
