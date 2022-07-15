import React from 'react';
import ReactDOM from 'react-dom';
import { Button, NumericInput, Navbar } from '@blueprintjs/core';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';
import { observer } from 'mobx-react-lite';

// create store
const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

// add page and element instantly
store.addPage({ bleed: 20 });
// show bleed
store.toggleBleed();

const Topbar = observer(({ store }) => {
  return (
    <Navbar>
      <Navbar.Group align="left">
        <div style={{ marginRight: '20px' }}>Bleed size (px):</div>
        <NumericInput
          value={store.activePage.bleed}
          onValueChange={(bleed) => {
            store.activePage.set({ bleed });
          }}
        />
        <Button
          onClick={() => {
            store.toggleBleed();
          }}
          active={store.bleedVisible}
          style={{ marginLeft: '20px' }}
        >
          Toggle bleed on Workspace
        </Button>
      </Navbar.Group>
      <Navbar.Group align="right">
        <Button
          onClick={() => {
            store.saveAsImage({ includeBleed: true });
          }}
          style={{ marginLeft: '20px' }}
        >
          Export
        </Button>
      </Navbar.Group>
    </Navbar>
  );
});

export const App = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Topbar store={store} />
      <div style={{ height: 'calc(100% - 50px)' }}>
        <PolotnoContainer className="polotno-app-container">
          <SidePanelWrap>
            <SidePanel store={store} />
          </SidePanelWrap>
          <WorkspaceWrap>
            <Toolbar store={store} />
            <Workspace store={store} />
            <ZoomButtons store={store} />
          </WorkspaceWrap>
        </PolotnoContainer>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
