import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';
// Be sure to include styles at some point, probably during your bootstrapping
import '@blueprintjs/core/lib/css/blueprint.css';
import { SvgEditTableButton, tableToSvg } from './edit-table';

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

const table = [
  ['Company', 'Contact', 'Country'],
  ['Alfreds Futterkiste', 'Maria Anders', 'Germany'],
  ['Centro comercial Moctezuma', 'Francisco Chang', 'Mexico'],
  ['Ernst Handel', 'Roland Mendel', 'Austria'],
  ['Island Trading', 'Helen Bennett', 'UK'],
  ['Laughing Bacchus Winecellars', 'Yoshi Tannamuri', 'Canada'],
  ['Magazzini Alimentari Riuniti', 'Giovanni Rovelli', 'Italy'],
];

const { src, ratio } = tableToSvg(table);

store.activePage.addElement({
  type: 'svg',
  src,
  width: 600,
  height: 600 * ratio,
  custom: {
    table: table,
  },
});

export const App = observer(() => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            SvgEditTableButton,
          }}
        />
        <Workspace
          store={store}
          components={{
            SvgEditTableButton,
          }}
        />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
