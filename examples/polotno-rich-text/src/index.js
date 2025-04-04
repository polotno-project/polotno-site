import React from 'react';
import ReactDOM from 'react-dom/client';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { PagesTimeline } from 'polotno/pages-timeline';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { unstable_useHtmlTextRender } from 'polotno/config';
import '@blueprintjs/core/lib/css/blueprint.css';
import { createStore } from 'polotno/model/store';
import { observer } from 'mobx-react-lite';
import {
  quillRef,
  createQuill,
  setQuillContent,
} from 'polotno/canvas/html-element';
import { Button } from '@blueprintjs/core';

unstable_useHtmlTextRender(true);

const store = createStore({
  key: 'nFA5H9elEytDyPyvKL7T', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

store.activePage.addElement({
  type: 'text',
  text: 'Hello <strong>from rich</strong> <u>text</u> <span style="color: red;">support</span>!',
  y: 300,
  x: store.width / 2 - 200,
  fontSize: 80,
  width: 400,
});

const createTempQuill = ({ html }) => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  // el.innerHTML = html;
  el.style.display = 'none';
  el.style.whiteSpace = 'pre-wrap';
  const quill = createQuill(el);
  setQuillContent(quill, html);
  return quill;
};

const removeTempQuill = (quill) => {
  quill.root.parentElement.remove();
};

const ToggleButton = observer(
  ({
    active,
    globalActive,
    format,
    element,
    disableGlobal,
    enableGlobal,
    icon,
    ...props
  }) => {
    return (
      <Button
        {...props}
        minimal
        icon={icon}
        active={active}
        onMouseDown={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          let quill = window.__polotnoQuill;

          if (quill) {
            const selection = quill.getSelection();
            quill.formatText(
              selection.index,
              selection.length,
              format,
              !quillRef.currentFormat[format],
              'user'
            );
            if (globalActive) {
              disableGlobal();
            }
            return;
          }

          // if whole text selected, let's remove bold from inner
          quill = createTempQuill({ html: element.text });
          quill.setSelection(0, quill.getLength(), 'api');
          quill.format(format, false);
          const innerHtml = quill.root.innerHTML;
          removeTempQuill(quill);
          element.set({ text: innerHtml });

          if (globalActive) {
            disableGlobal();
          } else {
            enableGlobal();
          }
        }}
      />
    );
  }
);

export const TextBold = observer(({ element, store }) => {
  return (
    <ToggleButton
      format="bold"
      active={
        quillRef.currentFormat.bold ||
        element.fontWeight === 'bold' ||
        element.fontWeight === '700'
      }
      globalActive={
        element.fontWeight === 'bold' || element.fontWeight === '700'
      }
      element={element}
      disableGlobal={() => element.set({ fontWeight: 'normal' })}
      enableGlobal={() => element.set({ fontWeight: 'bold' })}
      text="Bold"
    />
  );
});

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            TextBold,
          }}
        />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App store={store} />);
