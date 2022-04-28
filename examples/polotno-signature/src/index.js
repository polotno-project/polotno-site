import React from "react";
import ReactDOM from "react-dom";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";

import { Workspace } from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { createStore } from "polotno/model/store";
import { SignatureSection } from "./SignatureSection";

// import all default sections
import { DEFAULT_SECTIONS } from "polotno/side-panel";

// create store
const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "nFA5H9elEytDyPyvKL7T",
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true
});
// add to global namespace for debugging
window.store = store;

// add page and element instantly
store.addPage();

// looad document template
fetch("./polotno.json")
  .then((req) => req.json())
  .then((json) => store.loadJSON(json));


// we will have just two sections
const sections = [SignatureSection, ...DEFAULT_SECTIONS];

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={sections}
          defaultSection="signature"
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
