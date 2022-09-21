import { createDemoApp } from 'polotno/polotno-app';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import './star-element';

const { store } = createDemoApp({
  container: document.getElementById('root'),
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.com/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

store.pages[0].addElement({ type: 'star', radius: 100, fill: 'red' });

store.pages[0].addElement({
  x: store.width - 200,
  y: store.height - 200,
  type: 'star',
  radius: 100,
  fill: 'green',
});
