---
title: Integration with Next.js framework.
---

### How to use Polotno Design editor with Next.js framework?

1. Create isolated React component for all Polotno-related UI.
2. Put that component inside `components` folder. Or it can be another folder. **But it is important to NOT use `pages` or `app` folder!!!**
3. Use dynamic import for that component. It will help to avoid SSR errors. https://nextjs.org/docs/advanced-features/dynamic-import
4. In some versions of next.js you may need to set up `next.config.js` to make it work:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }]; // required to make Konva & react-konva work
    return config;
  },
};

module.exports = nextConfig;
```

> Note: polotno is not designed for Server Side Rendering of UI. Most of its modules are browser-only.
> This is why we need to move editor component out of `pages` or `app` folder.
> Otherwise Next.js will try to render it on the server and it will fail.

```js
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../components/editor'), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <div>
      <Editor />
    </div>
  );
}
```

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-nextjs" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-nextjs?fontsize=11&hidenavigation=1&theme=dark&view=preview"
    style={{
      width: '100%',
      height: '700px',
      border: 0,
      overflow: 'hidden',
    }}
    title="Polotno demo"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-downloads"
  ></iframe>
