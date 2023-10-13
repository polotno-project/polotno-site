---
title: Non-React integration
---

# How to integrate Polotno into your non-React project?

`Polotno` is designed to use with React framework. So you have to have React environment to customize it.
That doesn't mean you can't use Polotno with other frameworks such as Vue, Angular, Svelte, etc.
You can, and let me show you how.

The idea is simple:

1. Created isolated project for "editor" component
2. Use Polotno to build your editor, customize it as you want
3. Make some kind of API methods to communicate with your main project
4. Bundle project into plain source files, where you don't have to use jsx, transpilers, etc.
5. Use that bundle in your main project

**Warning: React skills will be still required to customize Polotno editor.**

In modern days there are many tools to create react projects. For the demo I will use [parcel](https://parceljs.org/) bundler.

If you want to see the sample result, you can check [example repo](https://github.com/polotno-project/polotno-site/tree/source/examples/polotno-non-react-integration).

## 1. Installations

First of all, you need to install `parcel` bundler, `polotno` and `react`:

```bash
npm install parcel polotno react react-dom
```

## 2. Create project

Right in your project folder create a new folder for editor. I will call it `editor`.

```bash
mkdir editor
```

## 3. Create index.html

Create `index.html` file in the `editor` folder. It will be a template for your editor.

**Note: HTML file will be not used in your application later. We need it just for isolated development.**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <link
      href="https://unpkg.com/@blueprintjs/core@5/lib/css/blueprint.css"
      rel="stylesheet"
    />
    <style>
      body {
        padding: 0;
        margin: 0;
      }
      #root {
        width: 100vw;
        height: 100%;
      }
    </style>
  </head>

  <body>
    <div id="root"></div>
    <script src="./index.js" type="module"></script>
    <script>
      window.onload = () => {
        window.createEditor({ container: document.getElementById('root') });
      };
    </script>
  </body>
</html>
```

## 4. Create index.js

Create `index.js` file in the `editor` folder. It will be a main entry point for your editor.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

// default API of your editor
export const createEditor = ({ container }) => {
  const root = ReactDOM.createRoot(container);
  root.render(<App store={store} />);
};

// make API global for simple start in development
window.createEditor = createEditor;
```

### 5. Start development server

```bash
parcel ./editor/index.html
```

Tip: you can also add this command to your `package.json` file:

```json
"scripts": {
  "dev": "parcel ./editor/index.html",
}
```

## 6. Open editor in browser

Open http://localhost:1234 in your browser. That URL is default by `parcel` bundler. But it may use a different port. So watch your terminal.

## 7. Compile editor

First you need to tell `parcel` where you want to put compiled code. For that you need to add this line into `package.json` file:

```json
"main": "editor.js",
```

When you are happy with your editor, you can compile it into plain JS files. For that you need to run:

```bash
parcel build ./editor/index.js --no-source-maps
```

Also you can add this command to your `package.json` file:

```json
"scripts": {
  "build:editor": "parcel build ./editor/index.js --no-source-maps",
}
```

## 8. Use editor in your project

Now you can use your editor in your project. For that you need to add `editor.js` file into your project. And then you can use it like this:

```js
import { createEditor } from './editor.js';

// somewhere in you code:
createEditor({ container: document.getElementById('editor') });
```

**Note: every time you do changes in `editor.js` or any other file in `editor` folder, you need to recompile it.**

Also remember to include CSS styles into your project:

```html
<link
  href="https://unpkg.com/@blueprintjs/core@5/lib/css/blueprint.css"
  rel="stylesheet"
/>
```

## 9. API

`createEditor` method here is just a simple example. You can customize it as you want. For example, you can add some methods to communicate with your main project.
You can pass some data into it and define some callbacks. Only your imagination is a limit.

## Vue example

[Open Vite + Vue + Polotno example](https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-and-vue-custom?file=/src/components/Editor.vue)

## 10. Pitfalls

- Installing all editor dependencies may go into conflict with your own project. If that is the case, you can put whole editor workflow into its own `package.json` file in `editor` folder and install all dependencies there.
