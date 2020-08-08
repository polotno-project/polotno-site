import React from 'react';
import Layout from '@theme/Layout';
import Navbar from '@theme/Navbar';

const PolotnoApp = React.lazy(() =>
  import('polotno/polotno-app').then((m) => {
    return { default: m.PolotnoApp };
  })
);

function Hello() {
  const [store, setStore] = React.useState();

  React.useEffect(() => {
    const run = async () => {
      // const { createStore } = await import('../../../polotno/src/model/store');
      const { createStore } = await import('polotno/model/store');
      const s = createStore();

      window.store = s;
      // // s.addPage();
      if (localStorage.getItem('polotno-state')) {
        if (confirm('Load previous session?')) {
          try {
            const json = JSON.parse(localStorage.getItem('polotno-state'));
            s.loadJSON(json);
          } catch (e) {
            alert('Sorry, I can not load it');
            console.error(e);
          }
        }
      }
      s.on('change', () => {
        const json = s.toJSON();
        localStorage.setItem('polotno-state', JSON.stringify(json));
      });
      if (s.pages.length === 0) {
        s.addPage();
      }
      setStore(s);
    };
    run();
  }, []);

  return (
    <Layout>
      {/* Layout */}
      {/* <Navbar /> */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: 'calc(100vh - 60px)',
        }}
      >
        <link
          href="https://unpkg.com/@blueprintjs/icons@^3.4.0/lib/css/blueprint-icons.css"
          rel="stylesheet"
        />
        <link
          href="https://unpkg.com/@blueprintjs/core@^3.10.0/lib/css/blueprint.css"
          rel="stylesheet"
        />
        {store && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <PolotnoApp store={store} />
          </React.Suspense>
        )}
      </div>
    </Layout>
  );
}

export default Hello;
