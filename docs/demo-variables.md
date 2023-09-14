---
title: Dynamic template variables
hide_table_of_contents: true
---

You can use the power of Polotno SDK to create templates with dynamic variables. It may help to create many similar designs with different text or images.

![Variables](/img/variables.png)

You have full flexibility to build your own template system and even UI for it, when necessary.

The workflow is simple:

1. Create a design with some variables in it.
2. Export design as JSON.
3. Save this JSON to the database/backend
4. When you need to create a new design or export it, load JSON from the database and replace variables with real data.
5. Load or export generated JSON

Every design in Polotno can be represented as JSON via `store.toJSON()` function. Now it is up to you to decide how to create variations of this JSON. Here are several examples.

## Simple text replacement

As part of your application convention you can use `{variable}` syntax to mark places where you want to replace text. Users of the editor may manually type this text or you can provide some UI for it.

```js
store.activePage.addElement({
  type: 'text',
  // lets use name variable
  text: 'Hello {name}!',
});
```

When you want to generate a new design or export it, you can replace `{name}` with real name. Here is pseudo code for the backend:

```js
const json = loadJSONFromDatabase();
const names = ['John', 'Mike', 'Anna'];
// do bulk export
for (var name of names) {
  // we need to replace {name} with real name
  // ideally you should loop over all text elements and replace text there
  // but we can do a simple string replace for this example
  const jsonString = JSON.stringify(json);
  const newJson = JSON.parse(jsonString.replace('{name}', name));
  // export newJson
  await convertJSONToImage(newJson);
}
```

## Image replacement

You can setup similar workflow for images. To mark some images as variable you can use `custom` attribute of `image` element. It is a free form object that you can use to store any data. You can make your own UI where users can change this data.

```js
store.activePage.addElement({
  type: 'image',
  src: 'https://example.com/placeholder.png',
  custom: {
    // lets use avatar variable
    variable: 'avatar',
  },
});
```

Then on the backend you can replace `src` of this image with real image url based on information from `custom` attribute.

```js
// util function to handle deep traversal of json
const forEveryChild = (node, cb) => {
  if (node.children) {
    node.children.forEach((child) => {
      cb(child);
      forEveryChild(child, cb);
    });
  }
};

const json = loadJSONFromDatabase();
const avatars = [
  'https://example.com/avatar1.png',
  'https://example.com/avatar2.png',
];
// do bulk export
for (var avatar of avatars) {
  // find all avatar images in the json
  json.pages.forEach((page) => {
    forEveryChild(page, (child) => {
      if (child.type === 'image' && child.custom?.variable === 'avatar') {
        child.src = avatar;
      }
    });
  });
  // export json
  await convertJSONToImage(json);
}
```

## Demo

The demo will show you how to replace text in the design. The demo specify only one variable `{name}` but you can add more variables according to your application logic.

Click "Preview" button to see how generation works.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-variables" target="_blank">Open Demo</a></p>

<iframe
    src="https://codesandbox.io/embed/github/polotno-project/polotno-site/tree/source/examples/polotno-variables?fontsize=11&hidenavigation=1&theme=dark&view=preview"
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
