// this file is a bootstrap of polotno editor
// from here you can start any customization
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import * as React from "react";
import createStore from "polotno/model/store";
import "@blueprintjs/core/lib/css/blueprint.css";

export const store = createStore({ key: "your-api-key", showCredit: true });
store.addPage();

export const App = () => {
  return (
    <PolotnoContainer style={{ height: "90vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};
