import React from 'react';
// polotno is made with mobx library
// we will need its tools to make reactive components
import { observer } from 'mobx-react-lite';
// import Konva components
import { Star } from 'react-konva';

// import toolbar components
import { NumericInput, Navbar, Alignment } from '@blueprintjs/core';
import ColorPicker from 'polotno/toolbar/color-picker';

// import Polotno API methods
import { unstable_registerShapeComponent } from 'polotno/config';
import { unstable_registerToolbarComponent } from 'polotno/config';
import { unstable_registerShapeModel } from 'polotno/config';
import { unstable_registerTransformerAttrs } from 'polotno/config';

// define our model
// we need to provide all default values
unstable_registerShapeModel({
  type: 'star',
  radius: 100,
  fill: 'black',
  numPoints: 6,
});

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

// now we can register canvas component
unstable_registerShapeComponent('star', StarElement);
// and change default transformer a bit
unstable_registerTransformerAttrs('star', {
  enabledAnchors: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
});

// now we can define custom toolbar
const LineToolbar = observer(({ store }) => {
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
        onValueChange={(val) => {
          element.set({ radius: val });
        }}
        value={element.radius}
        style={{ width: '50px', marginLeft: '10px' }}
        min={1}
        max={500}
      />
    </Navbar.Group>
  );
});

unstable_registerToolbarComponent('star', LineToolbar);
