import React from 'react';
import ReactDOM from 'react-dom/client';
import { observer } from 'mobx-react-lite';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { PageControls as DefaultPageControls } from 'polotno/canvas/page-controls';
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

const PageControls = observer((props) => {
  const activeIndex = store.pages.indexOf(store.activePage);
  const canGoBack = activeIndex > 0;
  const canGoForward = activeIndex < store.pages.length - 1;
  const height = store.scale * props.page.computedHeight;

  return (
    <>
      <DefaultPageControls {...props} />
      <Button
        disabled={!canGoBack}
        style={{
          position: 'absolute',
          top: props.yPadding + height / 2 + 'px',
          left: 5 + 'px',
        }}
        onClick={() => {
          store.selectPage(store.pages[activeIndex - 1].id);
        }}
      >
        {'<'}
      </Button>
      <Button
        disabled={!canGoForward}
        style={{
          position: 'absolute',
          top: props.yPadding + height / 2 + 'px',
          right: 5 + 'px',
        }}
        onClick={() => {
          store.selectPage(store.pages[activeIndex + 1].id);
        }}
      >
        {'>'}
      </Button>
    </>
  );
});

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace
          store={store}
          renderOnlyActivePage
          components={{ PageControls }}
        />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
