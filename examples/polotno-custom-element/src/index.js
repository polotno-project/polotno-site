import { createDemoApp } from "polotno/polotno-app";

import "./star-element";

const { store } = createDemoApp({
  container: document.getElementById("root"),
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "nFA5H9elEytDyPyvKL7T"
});

store.pages[0].addElement({ type: "star", radius: 100, fill: "red" });

store.pages[0].addElement({
  x: store.width - 200,
  y: store.height - 200,
  type: "star",
  radius: 100,
  fill: "green"
});
