---
title: Hidden panels
---

## How to implement "hidden" side panel?

You can implement side panel in a way, that it is visible only in various situations, such as on element selection.

<p><a className="button button--primary" href="https://codesandbox.io/s/github/polotno-project/polotno-site/tree/source/examples/polotno-open-side-panel-programmatically" target="_blank">Open Demo</a></p>

```js
// define the new custom section
const CustomSection = {
  name: 'custom-text',
  // we don't need "Tab" property, because it will be hidden from the list
  visibleInList: false,
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const text = store.selectedElements[0]?.text;
    return (
      <div>
        <InputGroup
          value={text}
          onChange={() => {
            store.selectedElements[0].set({ text: e.target.value });
          }}
        />
      </div>
    );
  }),
};

// add new section to side bar
const sections = [...DEFAULT_SECTIONS, CustomSection];

// use mobx API to react to selection changes
autorun(() => {
  const textSelected = store.selectedElements[0]?.type === 'text';
  if (textSelected) {
    store.openSidePanel('custom-text');
  }
});

export const App = () => {
  return (
    <PolotnoContainer className="polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};
```
