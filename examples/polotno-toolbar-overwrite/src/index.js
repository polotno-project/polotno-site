import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import { Toolbar } from 'polotno/toolbar/toolbar';
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

// lets create text element to show how to overwrite toolbar
store.activePage.addElement({
  type: 'text',
  x: 100,
  y: 100,
  text: 'Hello worlds',
});

const MyColorPicker = observer(({ store, element, elements }) => {
  // store - main polotno store object
  // elements - array of selected elements. The same as store.selectedElements
  // element - first selected element. The same as store.selectedElements[0]
  return (
    <div>
      <input
        type="color"
        value={element.fill}
        onChange={(e) => {
          element.set({
            fill: e.target.value,
          });
        }}
      />
    </div>
  );
});

// as example lets disable font size input for text element
// just return null from your component
const TextFontSize = () => null;

// also we can invent our own new component
const TextAlertButton = observer(({ store, element, elements }) => {
  return (
    <Button
      onClick={() => {
        alert('Hello!');
      }}
    >
      Alert
    </Button>
  );
});

// also we can disable default Undo/Redo buttons via History component
const History = () => null;

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            TextFill: MyColorPicker,
            TextFontSize,
            TextAlertButton,
            History,
          }}
        />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
