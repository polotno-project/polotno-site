import '@blueprintjs/core/lib/css/blueprint.css';

import { reaction } from 'mobx';

import { createDemoApp } from 'polotno/polotno-app';
import { unstable_setTextOverflow } from 'polotno/config';

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

store.activePage.addElement({
  type: 'text',
  text: 'Text with the default resize behavior',
  y: 100,
  x: store.width / 2 - 200,
  fontSize: 50,
  width: 400,
  height: 400,
  name: 'overflow-default',
});

store.activePage.addElement({
  type: 'text',
  text: 'Type here to see how font is reduced',
  y: 600,
  x: store.width / 2 - 200,
  fontSize: 50,
  width: 400,
  height: 400,
  name: 'overflow-reduce-font',
});

// react to selection change
reaction(
  () => {
    return store.selectedElements.map((el) => el.id);
  },
  () => {
    const el = store.selectedElements[0];
    if (!el) {
      return;
    }
    if (el.name === 'overflow-default') {
      unstable_setTextOverflow('resize');
    } else if (el.name === 'overflow-reduce-font') {
      unstable_setTextOverflow('change-font-size');
    }
  }
);
