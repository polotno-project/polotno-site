import React from "react";
import ReactDOM from "react-dom/client";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { PagesTimeline } from "polotno/pages-timeline";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { Button } from "@blueprintjs/core";

import "@blueprintjs/core/lib/css/blueprint.css";

import { createStore } from "polotno/model/store";

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

const PageRotate = ({ store }) => {
  return (
    <Button
      onClick={() => {
        // Rotate the page by swapping width and height
        const oldWidth = store.width;
        const oldHeight = store.height;
        const newWidth = store.height;
        const newHeight = store.width;
        const centerX = store.width / 2;
        const centerY = store.height / 2;

        const newCenterX = newWidth / 2;
        const newCenterY = newHeight / 2;
        store.setSize(newWidth, newHeight);

        // Rotate each child element
        store.pages.forEach((page) => {
          page.children.forEach((child) => {
            const oldX = child.x;
            const oldY = child.y;
            const oldRotation = child.rotation || 0;

            // Translate to origin (center of the page)
            const translatedX = oldX - centerX;
            const translatedY = oldY - centerY;

            // Apply 90-degree rotation
            const rotatedX = -translatedY;
            const rotatedY = +translatedX;

            // Translate back to the original coordinate system
            const newX = newCenterX + rotatedX;
            const newY = newCenterY + rotatedY;

            // Set new positions and rotation
            child.set({
              x: newX,
              y: newY,
              rotation: oldRotation + 90, // Rotate the child by 90 degrees
            });
          });
        });
      }}
    >
      Rotate
    </Button>
  );
};

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} components={{ PageRotate }} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App store={store} />);
