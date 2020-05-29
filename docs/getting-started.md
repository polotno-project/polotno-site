---
id: getting-started
title: Getting Started
---

## Install

```bash
npm install polotno
```

## Demo app


```js
import { createApp } from 'polotno/demo-app';

const store = createApp({ container: document.getElementById('root') });
```

## Overview

`Polotno` consists of three main modules

1. Store

For saving and working with the objects tree of canvas editor. It provide API for adding/updating/removing canvas objects, undo/redo, selection changes, zooming.

2. Canvas component

React component for drawing canvas app on the page. It has all basic functionality for common edits: selection, resize and actualy objects drawing.

3. Toolbars

Set of components created as a demo for general canvas editor app.
- a toolbar for basic objects manipulations actions (such as align, remove, change objects styles, etc).
- side panels for adding new objects