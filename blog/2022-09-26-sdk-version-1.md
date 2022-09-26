---
title: Polotno SDK v1.0 is out
slug: sdk-version-1
---

Hey, my name is Anton. After 2.5 years of development, **I am excited to announce that Polotno SDK v1.0 is out!** 🎉

From this moment, I will follow the semantic versioning. It should keep your updates safe and predictable.

_But don't trust modern web and js developers and assume that every version can break your code._ 😅

## What is Polotno SDK?

Polotno SDK is a set of JavaScript modules, libraries and React Components to make "canva-like" design editors. It is already used by many companies in production.

![Polotno Screen](/2022-09-23/polotno-demo.jpg)

Polotno SDK is a good fit for a variety of business use cases:

1. Design and social media apps
2. Printings and merchandising companies
3. E-commerce and online stores

## Motivation

I am core maintainer of [KonvaJS 2d canvas library](https://konvajs.org/) and its sibling libraries such as `react-konva` and `vue-konva`. During my freelance career, I was working on several projects that tried to make another [canva.com](https://www.canva.com/) competitor (don't confuse "konva dot js" and "canva dom com"). On some cases, an app wasn't directly a competitor, but a tool with very similar editor functionality with just a different target audience. Over time I realized that I have good enough experience to make my own application. Why I am making such apps for **someone else**? I can make it **for myself**!

But, developing the application is probably not the hardest part. If I want to make another canva-clone, I will have to spend a lot of energy on marketing, finding users and inventing something that other applications don't have. And there are already an insane number of competitors. I gave up on the idea.

Only after a couple of years of background thinking, the nice idea visited my mind. Instead of making canva-clone as B2C business, I can make a B2B product for developers. I can make a javascript library/framework to easily develop and integrate full-featured canvas editor. And that looks like a nice fit for my skills. I am supporting `konva` for a long time. I spend countless hours on documentation, supporting, bug fixing and helping other DEVELOPERS to use it. So I know how to make a good developer experience. Well, I hope so...

This is how Polotno SDK was born. More on its history and plans you can read at the bottom of this post.

## Getting started

Polotno SDK is a tool for developers. So be ready to be one or find someone who knows why `0.1 + 0.2 !== 0.3`.

If it is too boring for you, you can see SDK in action in this [Minimal Codesandbox](https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-demo?from-embed) or customized demo application [Polotno Studio](https://studio.polotno.com).

### Installation

```bash
npm install polotno
```

### Bootstrap with React

This code is not-so-minimal, but it is ready-to-use template that you can easily modify later for your use cases

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

import { createStore } from 'polotno/model/store';

const store = createStore({
  // you can create it here: https://polotno.com/cabinet/
  key: 'LICENSE_KEY',
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
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

// make sure `root` element exists in your html and has defined size
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
```

## Business

At the current moment, Polotno Project is a solo-person indie bootstrapped project. I started to write its first lines on February 2020. It took me three months to make "proof-of-concept" product. Then six months more for adding core features, polishing, creating initial website. Somewhere around September 2020, I started public announcements. On December 2020, I got my first paying customer. At time of writing this post, I have 4k MRR on license subscriptions.

![MRR](/2022-09-23/mrr.png)

The real income from this business is much bigger because I am also selling customization development services and full source code access. But these aspects are not very predictable, so I am not focusing on them much.

## What is next?

I see a large demand for such tools in the market. And I see how my competitors are coming into the play. There are many features in my backlog, such as animations/videos support and more export formats as print-ready PDF, HTML and SVG. Also tons of other tools around SDK, such as extended [Cloud Render API](/docs/cloud-render).

The roadmap is available at [Polotno Roadmap](https://github.com/polotno-project/polotno-board/projects/1).

At the begging of Polotno SDK development, I created [Polotno Studio](https://studio.polotno.com) as a showcase of what is possible with this tool. My initial plan was that Studio will be always-free, no signups, not paywall application. Remember I mentioned that I don't want to spend time on marketing and finding users and doing B2C business? There were very small number of users for a long time, but recently it is getting more and more popular. Right now I have around 6k daily users (it is much?). And I want to add some cool, but expensive features such as "remove background from image". So probably I will still have to add some paywall to the Studio. Need to think how to keep it "hustle-free" as in original plan.

> **Here must be call-to-action. But I am bad at marketing, so subscribe to my channel and click the like button.**

<!-- Have a feedback? Please share it on my tweeter: -->
