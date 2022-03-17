import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@blueprintjs/core';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { DownloadButton } from 'polotno/toolbar/download-button';
import { createStore } from 'polotno/model/store';

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

store.addPage();

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        {/* by default no action controls */}
        <Toolbar store={store} />
        {/* show default download button */}
        <Toolbar store={store} downloadButtonEnabled />
        {/* Use default download button, but also add new button to save */}
        <Toolbar
          store={store}
          components={{
            ActionControls: ({ store }) => {
              return (
                <div>
                  <DownloadButton store={store} />
                  <Button
                    intent="primary"
                    onClick={() => {
                      alert('Saving');
                    }}
                  >
                    Save
                  </Button>
                </div>
              );
            },
          }}
        />
        <Toolbar
          store={store}
          components={{
            ActionControls: ({ store }) => {
              return (
                <div>
                  <Button
                    onClick={() => {
                      store.saveAsImage({ pixelRatio: 0.2 });
                    }}
                    minimal
                  >
                    Download Preview
                  </Button>
                  <Button
                    minimal
                    onClick={() => {
                      alert('Save clicked...');
                    }}
                  >
                    Save
                  </Button>
                </div>
              );
            },
          }}
        />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
