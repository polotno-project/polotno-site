import React from 'react';
import ReactDOM from 'react-dom';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';
import { BarcodeSection, getBarcode } from './BarcodeSection';

// import all default sections
import { DEFAULT_SECTIONS } from 'polotno/side-panel';

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

// add first bar code
const val = '10011';
getBarcode(val).then(({ src, width, height }) => {
  store.activePage.addElement({
    type: 'svg',
    name: 'barcode',
    x: store.width / 2 - 150,
    y: store.height / 2 - 100,
    width: 300,
    height: 200,
    src,
    width,
    height,
    custom: {
      value: val,
    },
  });
});

// we will have just two sections
const sections = [BarcodeSection, ...DEFAULT_SECTIONS];

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} defaultSection="barcode" />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
