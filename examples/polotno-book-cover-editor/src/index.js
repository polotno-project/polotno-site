import React from "react";
import ReactDOM from "react-dom";

import { Toolbar } from "polotno/toolbar/toolbar";
import { Workspace } from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel";
import { createStore } from "polotno/model/store";

import { Preview } from "./preview";

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: "nFA5H9elEytDyPyvKL7T"
});

// make global for debug
window.store = store;

store.setSize(300, 460);

store.addPage();
store.activePage.addElement({
  type: "text",
  text: "Polotno tips",
  x: 50,
  y: 100,
  fontSize: 30,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC"
});

store.activePage.addElement({
  type: "text",
  text: "by Anton Lavrenov",
  x: 50,
  y: 350,
  fontSize: 20,
  width: 200,
  align: "center",
  fontFamily: "Amatic SC"
});

const App = ({ store }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw"
      }}
    >
      <div style={{ width: "400px", height: "100%", display: "flex" }}>
        <SidePanel store={store} />
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          margin: "auto",
          flex: 1,
          flexDirection: "column",
          position: "relative"
        }}
      >
        <Toolbar store={store} />
        <Workspace store={store} />
        <Preview store={store} />
      </div>
    </div>
  );
};

ReactDOM.render(<App store={store} />, document.getElementById("root"));
