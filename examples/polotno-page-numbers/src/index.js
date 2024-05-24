import React from 'react';
import ReactDOM from 'react-dom';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';

// create store
const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.com/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
// add to global namespace for debugging
window.store = store;

// add page and element instantly
store.addPage();

const checkPageNumbers = () => {
  // check every page
  store.pages.forEach((page, index) => {
    // lets try to find existing page number element
    let pageNumber = page.children.find(
      (el) => el.custom?.name === 'page-number'
    );
    const text = `Page ${index + 1}`;
    if (pageNumber) {
      // if such element is already here, let's update it
      // in the case if a user reoderer pages
      pageNumber.set({ text });
    } else {
      // or just create a new one
      page.addElement({
        type: 'text',
        custom: { name: 'page-number' },
        text,
        width: store.width,
        align: 'center',
        fontSize: 40,
        x: 0,
        y: store.height - 50,
        selectable: false,
        alwaysOnTop: true,
      });
    }
  });
};

checkPageNumbers();
store.on('change', checkPageNumbers);

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
