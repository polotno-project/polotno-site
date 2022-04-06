import React from 'react';
import ReactDOM from 'react-dom';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { InputGroup } from '@blueprintjs/core';

import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';

import { DEFAULT_SECTIONS } from 'polotno/side-panel';

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

store.addPage();
store.activePage.addElement({
  type: 'text',
  text: 'Hello from Polotno',
  y: store.height / 2,
  width: store.width,
  fontSize: 50,
});

// define the new custom section
const CustomSection = {
  name: 'custom-text',
  // we don't need "Tab" property, because it will be hidden from the list
  visibleInList: false,
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const text = store.selectedElements[0]?.text;
    return (
      <div>
        <InputGroup
          value={text}
          onChange={(e) => {
            store.selectedElements[0]?.set({ text: e.target.value });
          }}
        />
      </div>
    );
  }),
};

// add new section
const sections = [...DEFAULT_SECTIONS, CustomSection];

export const App = () => {
  // add reacion using mobx API
  React.useEffect(() => {
    return autorun(() => {
      const textSelected = store.selectedElements[0]?.type === 'text';
      if (textSelected) {
        store.openSidePanel('custom-text');
      } else {
        store.openSidePanel('photos');
      }
    });
  }, []);
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
