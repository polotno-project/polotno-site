import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { Button } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { getClientRect } from 'polotno/utils/math';

import '@blueprintjs/core/lib/css/blueprint.css';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

const TextFullWidthBackground = observer(({ element }) => {
  return (
    <Button
      active={element.custom?.fullWidthBackground}
      minimal
      onClick={() => {
        element.set({
          custom: {
            ...element.custom,
            fullWidthBackground: !element.custom?.fullWidthBackground,
          },
        });
      }}
    >
      Background Fill
    </Button>
  );
});

const validateTextPosition = () => {
  // fist make sure we remove unrelated backgrouns
  const idsToDelete = [];
  store.find((element) => {
    const attachedTo = element.custom?.attachedTo;
    if (!attachedTo) {
      return;
    }
    const el = store.getElementById(attachedTo);
    const noBack = !el?.custom?.fullWidthBackground;
    if (!el || noBack) {
      idsToDelete.push(element.id);
    }
  });
  store.deleteElements(idsToDelete);

  store.find((element) => {
    if (!element.custom?.fullWidthBackground) {
      return;
    }
    let backgroundEl = store.find((el) => {
      return el.custom?.attachedTo === element.id;
    });
    if (!backgroundEl) {
      backgroundEl = element.page.addElement({
        type: 'figure',
        subType: 'rect',
        fill: 'grey',
        draggable: false,
        resizable: false,
        custom: {
          attachedTo: element.id,
        },
      });
    }
    const elementIndex = element.parent.children.indexOf(element);
    const backgroundIndex = backgroundEl.parent.children.indexOf(backgroundEl);
    if (elementIndex !== backgroundIndex + 1) {
      backgroundEl.page.setElementZIndex(backgroundEl.id, elementIndex);
    }

    const box = getClientRect(element);
    backgroundEl.set({
      x: 0,
      y: box.y,
      width: element.page.computedWidth,
      height: box.height,
    });
  });
};

store.on('change', () => {
  validateTextPosition();
});

store.activePage.addElement({
  type: 'text',
  text: 'Try to set my background',
  fontSize: 80,
  width: store.width / 2,
  x: store.width / 4,
  y: 200,
});

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} components={{ TextFullWidthBackground }} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
