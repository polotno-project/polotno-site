import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";

import { Workspace } from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { createStore } from "polotno/model/store";

// import all default sections
// we will not use all of them in the demo
// just to show what we have
import {
  TextSection,
  PhotosSection,
  ElementsSection,
  UploadSection,
  BackgroundSection,
  SizeSection
} from "polotno/side-panel/side-panel";
//
import { SectionTab } from "polotno/side-panel/tab-button";
// import our own icon
import FaShapes from "@meronex/icons/fa/FaShapes";

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "nFA5H9elEytDyPyvKL7T"
});

store.addPage();
store.activePage.addElement({
  type: "text",
  text: "hello"
});

// define the new custom section
const CustomSection = {
  name: "custom",
  Tab: (props) => (
    <SectionTab name="Custom" {...props}>
      <FaShapes icon="new-text-box" />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        <p>Here we will define our own custom tab.</p>
        <p>Elements on the current page: {store.activePage?.children.length}</p>
      </div>
    );
  })
};

// we will have just two sections
const sections = [CustomSection, TextSection];

export const App = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%"
      }}
    >
      <div style={{ width: "400px", height: "100%", display: "flex" }}>
        <SidePanel store={store} sections={sections} defaultSection="custom" />
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          margin: "auto",
          flex: 1,
          flexDirection: "column",
          position: "relative"
        }}
      >
        <Toolbar store={store} downloadButtonEnabled={true} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
