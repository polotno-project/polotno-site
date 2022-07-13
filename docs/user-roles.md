---
title: User roles
---

Different user roles in `Polotno Editor` will change UI and behavior of the application for specific use cases.

Currently `Polotno` has two roles - `admin` and `user`.

```js
store.setRole('admin');
```

When `admin` mode is enabled, a user will have extra settings for every elements on the canvas:

![Special settings UI](/img/admin-ui.png)

You can use `admin` mode to set several restrictions on elements. Such as:

1. Put an element on top and turn "selectable" off. Regular users will be not able to move/delete such elements.
2. Toggle off "show in export" for some elements. They will be not visible in image or PDF exports.
3. Fine-tune locking of elements. For example toggle off "can change style" on an text element, so users can't change its font, color, etc.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-admin-role" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-admin-role?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
