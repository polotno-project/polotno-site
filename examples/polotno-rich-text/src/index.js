import { createDemoApp } from 'polotno/polotno-app';
import { unstable_useHtmlTextRender } from 'polotno/config';

unstable_useHtmlTextRender(true);

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

const { store } = createDemoApp({
  container: document.getElementById('root'),
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.com/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
  // you can hide back-link on a paid licence
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});

store.activePage.addElement({
  type: 'text',
  text: 'Hello <strong>from rich</strong> <span style="color: red;">support</span>!',
  y: 300,
  x: store.width / 2 - 200,
  fontSize: 100,
  height: 400,
});
