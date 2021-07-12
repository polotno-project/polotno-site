import React from 'react';
import ReactDOM from 'react-dom';

import Workspace from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';

const store = createStore({
  // this is a demo key just for that project
  // (!) please don't use it in your projects
  // to create your own API key please go here: https://polotno.dev/cabinet
  key: 'nFA5H9elEytDyPyvKL7T',
});
store.setSize(500, 500);
const page = store.addPage();

page.set({
  background: '/tshirt.png',
});

const text = page.addElement({
  x: 150,
  y: 170,
  fontSize: 25,
  type: 'text',
  fill: 'black',
  text: 'The best t-shirt owner',
  width: 200,
});

const App = () => {
  return (
    <div>
      <div style={{ width: '100vw', height: '50px', textAlign: 'center' }}>
        <input
          placeholder="Type t-shirt text"
          style={{
            padding: '5px',
            width: '60%',
            margin: '10px',
          }}
          onChange={(e) => {
            text.set({ text: e.target.value });
          }}
        />
        <button
          onClick={() => {
            store.saveAsImage({ ignoreBackground: true });
          }}
        >
          Download print
        </button>
      </div>
      <div style={{ width: '100vw', height: 'calc(100vh - 50px)' }}>
        <Workspace store={store} pageControlsEnabled={false} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
