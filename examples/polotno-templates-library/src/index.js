import React from "react";
import ReactDOM from "react-dom";
import { Workspace } from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { createStore } from "polotno/model/store";

import { DEFAULT_SECTIONS } from "polotno/side-panel";
import { TemplatesSection } from "./templates-panel";

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "nFA5H9elEytDyPyvKL7T"
});

store.addPage();

const sections = [TemplatesSection, ...DEFAULT_SECTIONS];

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
        <SidePanel
          store={store}
          sections={sections}
          defaultSection="templates"
        />
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
