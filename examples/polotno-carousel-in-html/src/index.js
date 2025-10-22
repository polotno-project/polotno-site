import React from 'react';
import ReactDOM from 'react-dom/client';
import { observer } from 'mobx-react-lite';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { Button } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';

import { createStore } from 'polotno/model/store';
import { CarouselSection } from './CarouselPanel';
import { downloadAsHTML } from './exportHTML';
import { demoTemplate } from './template';

// Create store instance
const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

// Load demo template
store.loadJSON(demoTemplate);

// Select the carousel image for demo purposes
store.selectElements(['NRU00rfEml']);

// Expose store to window for debugging
window.store = store;

// Custom ActionControls component that overrides the download button
const ActionControls = observer(({ store }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    await downloadAsHTML(store);
    setIsLoading(false);
  };

  return (
    <Button
      text="Download"
      onClick={handleDownload}
      loading={isLoading}
      minimal
    />
  );
});

export const App = ({ store }) => {
  // Combine default sections with custom carousel section
  const sections = [CarouselSection, ...DEFAULT_SECTIONS];

  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel
          store={store}
          sections={sections}
          defaultSection="carousel"
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            ActionControls,
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
root.render(<App store={store} />);
