import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { reaction } from 'mobx';

import '@blueprintjs/core/lib/css/blueprint.css';

import { createStore } from 'polotno/model/store';

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

const width = 600;
const height = 400;

// Add a placeholder image element
// you can make you own with your own text
// placehold.co is just an example, better to use your own image
store.activePage.addElement(
  {
    type: 'image',
    src: 'https://placehold.co/600x400?text=Click+to+add+image',
    x: (store.width - width) / 2,
    y: (store.height - height) / 2,
    width,
    height,
    // custom property to identify placeholder
    custom: {
      isPlaceholder: true,
    },
  },
  { skipSelect: true }
);

export function usePlaceholderSelection(store) {
  const fileInputRef = React.useRef(null);

  // react to selected elements
  React.useEffect(() => {
    // Dispose reaction when component unmounts
    const dispose = reaction(
      () => store.selectedElements,
      (selectedElements) => {
        // Check if at least one selected element is a placeholder
        const placeholder = selectedElements.find(
          (el) => el.custom?.isPlaceholder
        );
        if (placeholder) {
          // Trigger the hidden file input
          fileInputRef.current?.click();
        }
      }
    );
    return () => dispose();
  }, [store]);

  // handle file change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      // we will use dataURL to set the image
      // but it is recommented to upload image to the server first
      // for better performance and smaller JSON export
      const dataURL = loadEvent.target.result;
      // Find the currently selected placeholder element
      const placeholder = store.selectedElements.find(
        (el) => el.custom?.isPlaceholder
      );
      if (placeholder) {
        placeholder.set({
          src: dataURL,
          custom: { isPlaceholder: false },
        });
      }
    };
    reader.readAsDataURL(file);
    // Reset the file input so selecting the same file triggers onChange again
    e.target.value = null;
  };

  // Return a hidden file input to be triggered by the reaction
  return (
    <input
      ref={fileInputRef}
      type="file"
      style={{ display: 'none' }}
      accept="image/*"
      onChange={handleFileChange}
    />
  );
}

export const App = ({ store }) => {
  const fileInput = usePlaceholderSelection(store);

  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        {fileInput}
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
