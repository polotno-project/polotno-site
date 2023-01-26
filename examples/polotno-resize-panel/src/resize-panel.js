import React from "react";
import { observer } from "mobx-react-lite";
import { Button } from "@blueprintjs/core";

const AVAILABLE_SIZES = [
  { width: 500, height: 500 },
  { width: 1000, height: 1000 },
  { width: 1500, height: 1500 }
];

export const ResizePanel = observer(({ store }) => {
  return (
    <div>
      {AVAILABLE_SIZES.map(({ width, height }, i) => (
        <Button
          key={i}
          style={{ width: "100%", marginBottom: "20px" }}
          onClick={() => {
            store.setSize(width, height);
          }}
        >
          {width}x{height}
        </Button>
      ))}
    </div>
  );
});
