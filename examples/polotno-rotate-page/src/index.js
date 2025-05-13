import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { Button } from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

// load template
fetch(
  'https://api.polotno.com/templates/2021-10-25-youtube-thumbnail-gradient-gaming.json'
)
  .then((res) => res.json())
  .then((data) => {
    store.loadJSON(data);
  });

const PageRotate = ({ store }) => {
  return (
    <Button
      minimal
      onClick={() => {
        // 1. swap page dimensions
        const [oldW, oldH] = [store.width, store.height];
        const [newW, newH] = [oldH, oldW];
        const [cx, cy] = [oldW / 2, oldH / 2];
        store.setSize(newW, newH);

        // 2. move + rotate every element
        const [ncx, ncy] = [newW / 2, newH / 2];
        store.pages.forEach((page) => {
          page.children.forEach((el) => {
            const [dx, dy] = [el.x - cx, el.y - cy];
            const [rx, ry] = [-dy, dx]; // 90° rotation matrix
            el.set({
              x: ncx + rx,
              y: ncy + ry,
              rotation: (el.rotation || 0) + 90,
            });
          });
        });
      }}
    >
      Rotate 90°
    </Button>
  );
};

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} components={{ PageRotate }} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
