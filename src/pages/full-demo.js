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
      const { Store } = await import('polotno/model/store');
      const s = Store.create();
      s.addPage();
      setStore(s);
    };
    run();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
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
    </React.Fragment>
  );
}

export default Hello;
