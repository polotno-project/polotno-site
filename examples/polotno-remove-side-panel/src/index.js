import React from 'react';
import ReactDOM from 'react-dom/client';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
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

// first you can log all sections into console to see what sections are defined
const names = DEFAULT_SECTIONS.map((section) => section.name);
console.log(names);

// if you don't need a specific section, you can remove it by its name
// let's remove upload section
const sections = DEFAULT_SECTIONS.filter(
  (section) => section.name !== 'upload'
);

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
