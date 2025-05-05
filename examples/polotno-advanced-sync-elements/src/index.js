import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { Button } from '@blueprintjs/core';
import { nanoid } from 'nanoid';
import { setupSync } from './sync';

import '@blueprintjs/core/lib/css/blueprint.css';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

setupSync(store);

store.addPage();

const text = 'try to apply me to all pages. Page number is: {pageNumber}';
store.activePage.addElement({
  type: 'text',
  text: text,
  custom: {
    text,
  },
  fontSize: 50,
  width: 400,
});

for (var i = 0; i < 5; i++) {
  const page = store.addPage();
}
store.pages[0].select();

const ApplyToAllPages = ({ store, element, elements }) => {
  return (
    <Button
      minimal
      onClick={() => {
        elements.forEach((element) => {
          // first let's remove all "copies" of that element in other pages
          if (element.custom?.syncId) {
            const idsToDelete = [];
            store.find((item) => {
              if (
                item.custom?.syncId === element.custom?.syncId &&
                item !== element
              ) {
                idsToDelete.push(item.id);
              }
            });
            console.log('idsToDelete', idsToDelete);
            store.deleteElements(idsToDelete);
          }
          // create sync id
          const syncId = nanoid();
          element.set({
            custom: {
              ...element.custom,
              syncId,
            },
          });
          // create a copy of element
          const props = { ...element.toJSON() };
          // remove id
          delete props.id;
          // put it on every page
          store.pages.forEach((page) => {
            if (page === element.page) {
              return;
            }
            page.addElement(
              {
                ...props,
              },
              { skipSelect: true }
            );
          });
        });
      }}
    >
      Apply to all pages
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
        <Toolbar
          store={store}
          components={{
            TextApplyToAllPages: ApplyToAllPages,
            ImageApplyToAllPages: ApplyToAllPages,
            VideoApplyToAllPages: ApplyToAllPages,
            FigureApplyToAllPages: ApplyToAllPages,
            GifApplyToAllPages: ApplyToAllPages,
            LineApplyToAllPages: ApplyToAllPages,
          }}
        />
        <Workspace
          store={store}
          components={{
            TextApplyToAllPages: ApplyToAllPages,
            ImageApplyToAllPages: ApplyToAllPages,
            VideoApplyToAllPages: ApplyToAllPages,
            FigureApplyToAllPages: ApplyToAllPages,
            GifApplyToAllPages: ApplyToAllPages,
            LineApplyToAllPages: ApplyToAllPages,
          }}
        />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
