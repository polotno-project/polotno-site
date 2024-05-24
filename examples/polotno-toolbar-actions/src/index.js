import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '@blueprintjs/core';
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { DownloadButton } from 'polotno/toolbar/download-button';
import { createStore } from 'polotno/model/store';

import '@blueprintjs/core/lib/css/blueprint.css';

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.com/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

store.addPage();

const ActionControls1 = ({ store }) => {
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
};

const ActionControls2 = ({ store }) => {
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
};

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <WorkspaceWrap>
        {/* by default no action controls */}
        <Toolbar store={store} />
        {/* show default download button */}
        <Toolbar store={store} downloadButtonEnabled />
        {/* Use default download button, but also add new button to save */}
        <Toolbar
          store={store}
          components={{
            ActionControls: ActionControls1,
          }}
        />
        {/* then use our own buttons for download and save */}
        <Toolbar
          store={store}
          components={{
            ActionControls: ActionControls2,
          }}
        />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
