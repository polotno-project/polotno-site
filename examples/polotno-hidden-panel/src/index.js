import React from 'react';
import ReactDOM from 'react-dom/client';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';
import { InputGroup } from '@blueprintjs/core';

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

// define the new custom section
const CustomSection = {
  name: 'custom-text',
  // use "empty" tab that will render nothing
  Tab: () => null,
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const text = store.selectedElements[0]?.text;
    return (
      <div>
        <InputGroup
          value={text}
          onChange={() => {
            store.selectedElements[0].set({ text: e.target.value });
          }}
        />
      </div>
    );
  }),
};

// add new section to side bar
const sections = [...DEFAULT_SECTIONS, CustomSection];

// use mobx reaction to react to selection changes
reaction(
  () => {
    const textSelected = store.selectedElements[0]?.type === 'text';
    return textSelected;
  },
  // we can use result returned from reaction
  (textSelected) => {
    if (textSelected) {
      store.openSidePanel('custom-text');
    }
  }
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
