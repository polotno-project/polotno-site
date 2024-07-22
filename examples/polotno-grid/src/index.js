import React from 'react';
import ReactDOM from 'react-dom/client';
import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { NumericInput, Switch, Alignment } from '@blueprintjs/core';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

import { Workspace } from 'polotno/canvas/workspace';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { createStore } from 'polotno/model/store';
import * as svg from 'polotno/utils/svg';

// import all default sections
import { DEFAULT_SECTIONS } from 'polotno/side-panel';

import { SectionTab } from 'polotno/side-panel';
// import our own icon
import BsFillGrid3X3GapFill from '@meronex/icons/bs/BsFillGrid3X3GapFill';

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

// add page and element instantly
store.addPage();
store.activePage.addElement({
  type: 'text',
  text: 'try to drag me to see snap on grid',
  width: 450,
  fontSize: 60,
});

// function to remove all grid-related elements
// we also can hide them instead
// but I think removing is just quicker
function clearGrid() {
  const gridElements = store.activePage.children.filter(
    (child) => child.name === 'grid'
  );
  const ids = gridElements.map((el) => el.id);
  store.deleteElements(ids);
}

// "dot" is a fake svg elements with no content
// but polotno will use it as snap point
function createDot(x, y) {
  const template = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>`;
  const url = svg.svgToURL(template);
  store.activePage.addElement({
    x,
    y,
    type: 'svg',
    width: 1,
    height: 1,
    src: url,
    name: 'grid',
    selectable: false,
  });
}

function generateGrid(rows, cols) {
  clearGrid();
  const { width, height } = store;
  const dx = width / cols;
  const dy = height / rows;
  // generate svg data for grid image
  const template = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
    ${[...Array(rows - 1)]
      .map(
        (_, index) =>
          `<line x1="${dx * (index + 1)}" y1="0" x2="${
            dx * (index + 1)
          }" y2="${height}" stroke="blue" stroke-width="2"/>`
      )
      .join('')}
      ${[...Array(cols - 1)]
        .map(
          (_, index) =>
            `<line x1="0" y1="${dy * (index + 1)}" x2="${width}" y2="${
              dy * (index + 1)
            }" stroke="blue" stroke-width="2"/>`
        )
        .join('')}
  </svg>`;

  // add grid image into the page
  const url = svg.svgToURL(template);
  store.activePage.addElement({
    type: 'svg',
    width,
    height,
    src: url,
    name: 'grid',
    selectable: false,
    opacity: 0.2,
    alwaysOnTop: true,
  });

  // add fake elements to snap on grid
  [...Array(rows - 1)].forEach((_, index) => {
    createDot(dx * (index + 1), 0);
  });
  [...Array(cols - 1)].forEach((_, index) => {
    createDot(0, dy * (index + 1));
  });
}

let rowsNumber = 5;
let colsNumber = 5;

// let's react to size changes
reaction(
  () => [store.width, store.height],
  () => {
    generateGrid(rowsNumber, colsNumber);
  }
);

// define the new custom section
const GridSection = {
  name: 'grid',
  Tab: (props) => (
    <SectionTab name="Grid" {...props}>
      <BsFillGrid3X3GapFill />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const [visible, setVisible] = React.useState(true);
    React.useEffect(() => {
      if (!visible) {
        clearGrid();
      } else {
        generateGrid(rowsNumber, colsNumber);
      }
    }, [visible]);
    return (
      <div>
        <div>
          <Switch
            checked={visible}
            onChange={(val) => {
              setVisible(val.target.checked);
            }}
            alignIndicator={Alignment.RIGHT}
            style={{
              marginTop: '8px',
              marginBottom: '25px',
            }}
          >
            Show grid
          </Switch>
          <div style={{ width: '50%', display: 'inline-block' }}>Rows:</div>
          <div style={{ width: '50%', display: 'inline-block' }}>
            <NumericInput
              fill
              defaultValue={rowsNumber}
              onValueChange={(rows) => {
                rowsNumber = rows || 1;
                generateGrid(rowsNumber, colsNumber);
              }}
              min={1}
              max={100}
              selectAllOnFocus
            />
          </div>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <div style={{ width: '50%', display: 'inline-block' }}>Cols:</div>
          <div style={{ width: '50%', display: 'inline-block' }}>
            <NumericInput
              fill
              defaultValue={colsNumber}
              onValueChange={(cols) => {
                colsNumber = cols || 1;
                generateGrid(rowsNumber, colsNumber);
              }}
              min={1}
              max={100}
              selectAllOnFocus
            />
          </div>
        </div>
      </div>
    );
  }),
};

// we will have just two sections
const sections = [GridSection, ...DEFAULT_SECTIONS];

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} defaultSection="grid" />
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
