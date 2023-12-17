---
title: Overlays and Watermarks
hide_table_of_contents: true
---

In graphic design, controlling the behavior of elements is crucial for creating professional and efficient designs. Special properties like `selectable: false`, `alwaysOnTop: true`, and `showInExport: false` provide developers with the flexibility to manage overlays, watermarks, and guides seamlessly within their projects.

The most common uses cases are:

- **Watermarks**: Protect your designs while keeping them non-interactive.
- **Overlays**: Display information or graphics that stay visible without interfering with design interaction.
- **User Tips**: Provide guidance within the design that doesn't export with the final product.
- **Cutting Edges**: Keep guide marks visible only during the design process.

Here is how you can create such elements:

```js
store.activePage.addElement({
  type: 'image',
  src: 'path-to-your-watermark-or-overlay.png',
  // this will make it non-selectable
  selectable: false,
  // this will make it always on top
  alwaysOnTop: true,
  // this will make it not visible in export
  showInExport: false,
});
```

## Example

In the demo let's add a dashed red shape on top of the design and make it non-selectable, always on top, and not visible in export.
Regular user can't do anything with it, but it is visible on the screen.
You can use special "admin" role to allow users to interact with such elements. See [Roles](/docs/user-roles) for more details.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-overlay" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-overlay?fontsize=11&hidenavigation=1&theme=dark&view=preview"
    style={{
      width: '100%',
      height: '700px',
      border: 0,
      overflow: 'hidden',
    }}
    title="Polotno Overlay demo"
    allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
    sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin allow-downloads"
  ></iframe>
