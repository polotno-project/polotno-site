---
title: Custom elements
---

**THIS PAGE IS ABOUT VERY EXPERIMENTATION FEATURES OF POLOTNO!**

**Please use it carefully. Watch [changelog](/changelog) for any changes!**

By design `polotno` support three main types of elements: `text`, `image` and `svg`.
In some cases you may want to create your own custom elements.

# How to create custom shapes with Polotno?

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

// polotno util function
import { useSnap } from 'polotno/canvas/use-snap';

// every components has three main props - onClick, element and store
export const StarElement = observer(({ onClick, element, store }) => {
  const ref = React.useRef();
  // useSnap - is utility hook that automatically enables snapping
  const { onDragMove, onDragEnd } = useSnap(ref);

  const handleChange = (e) => {
    const node = e.currentTarget;
    const scaleX = node.scaleX();
    // Konva.Transformer is changing scale by default
    // we don't need that, so we reset it back to 1.
    node.scaleX(1);
    node.scaleY(1);
    element.set({
      x: node.x(),
      y: node.y(),
      rotation: e.target.rotation(),
      width: element.width * scaleX,
    });
  };

  // VERY IMPORTANT note!
  // element.x and element.y - must define top-left corner of the shape
  // so all position attributes are consistent across all elements
  return (
    <Star
      ref={ref}
      name="element"
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
      onDragStart={() => {
        const isSelected = store.selectedElements.find((e) => e === element);
        if (!isSelected) {
          store.selectElements([element.id]);
        }
      }}
      onDragMove={(e) => {
        onDragMove(e);
        handleChange(e);
      }}
      onDragEnd={(e) => {
        onDragEnd(e);
      }}
      id={element.id}
      onClick={() => {
        onClick();
      }}
      onTap={() => {
        onClick();
      }}
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
