import React from "react";
// polotno is made with mobx library
// we will need its tools to make reactive components
import { observer } from "mobx-react-lite";
// import Konva components
import { Star } from "react-konva";

// import toolbar components
import { NumericInput, Navbar, Alignment } from "@blueprintjs/core";
import ColorPicker from "polotno/toolbar/color-picker";

// import Polotno API methods
import { unstable_registerShapeComponent } from "polotno/config";
import { unstable_registerToolbarComponent } from "polotno/config";
import { unstable_registerShapeModel } from "polotno/config";
import { unstable_registerTransformerAttrs } from "polotno/config";

// use default snap
import { useSnap } from "polotno/canvas/use-snap";

unstable_registerShapeModel({
  type: "star",
  radius: 100,
  fill: "black",
  numPoints: 6
});

// every components has three main props - onClick, element and store
export const StarElement = observer(({ onClick, element, store }) => {
  const ref = React.useRef(null);

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
      radius: element.radius * scaleX
    });
  };

  // VERY IMPORTANT note!
  // element.x and element.y - must define top-left corner of the shape
  // so all position attributes are consistent across all elements
  return (
    <Star
      ref={ref}
      name="element"
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

unstable_registerShapeComponent("star", StarElement);
unstable_registerTransformerAttrs("star", {
  enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"]
});

const LineToolbar = observer(({ store }) => {
  const element = store.selectedElements[0];

  return (
    <Navbar.Group align={Alignment.LEFT}>
      <ColorPicker
        value={element.fill}
        onChange={(fill) =>
          element.set({
            fill
          })
        }
      />
      <NumericInput
        onValueChange={(val) => {
          element.set({ radius: val });
        }}
        value={element.radius}
        style={{ width: "50px", marginLeft: "10px" }}
        min={1}
        max={500}
      />
    </Navbar.Group>
  );
});

unstable_registerToolbarComponent("star", LineToolbar);
