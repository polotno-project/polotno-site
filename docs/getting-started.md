---
id: getting-started
title: Getting Started
---

## Quick start

Install `polotno` package:

```bash
npm install polotno
```

Init demo application:


```js
import { createApp } from 'polotno/demo-app';

const store = createApp({ container: document.getElementById('root') });
```