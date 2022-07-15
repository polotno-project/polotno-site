---
title: Page bleed
---

In printing, bleed is printing that goes beyond the edge of where the sheet will be trimmed.

Polotno has native support for bleed. Every page has it own `bleed` property. By default bleeds are not visible on the workspace and export. Also bleed doesn't affect inner part of the page. To show bleed on the canvas you can do this:

```js
store.activePage.set({ bleed: 20 }); // set bleed in pixels

// show bleed area on the <Workspace />
store.toggleBleed(true);
```

The canvas will have special space around the page:

<img src="/img/page-with-bleed.png" style={{maxWidth: "500px"}}/>

To include bleed in the export you can do this:

```js
store.saveAsImage({ includeBleed: true });
store.saveAsPDF({ includeBleed: true });
```

Now let's make a quick demo. I created special top bar to control bleed of the page, toggle its visibility and export with bleed included.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-page-bleed" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-page-bleed?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
