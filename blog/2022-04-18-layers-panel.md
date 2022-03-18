---
title: New "Layers" panel
slug: 2022-04-18-new-layers-panel
---

The new "Layers" panel was introduced in Polotno `v0.42.4`.

<video src="/2022-04-18/layers-intro.mp4" loop="true" autoplay="autoplay" muted style={{width: '100%'}} />

Using the panel, you can visually see order of elements in the list. You can easily change z index of any element with a simple drag and drop.

Also every element now has a `name` attribute that you can change for later reference. If element has no name, Polotno will display its `id` or part of a text context (if it is a text element).

From the side panel you can hide/show elements, you can lock unlock then and you can delete elements.

<video src="/2022-04-18/layers-demo.mp4" loop="true" autoplay="autoplay" muted style={{width: '100%'}} />

The new `name` attribute can be used to search for elements in the store. The most common use case is to overwrite some data in JSON and convert in into image.

Remember that if you don't like the new "Layers" panel in your application, you can always remove it with [SidePanel customization](/docs/side-panel).

<p style={{ textAlign: 'center' }}><a className="button button--primary" href="/docs/overview">Get Started with Polotno SDK</a></p>
