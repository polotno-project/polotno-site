import React from "react";
import ReactDOM from "react-dom/client";
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Toolbar } from "polotno/toolbar/toolbar";
import { PagesTimeline } from "polotno/pages-timeline";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { SidePanel } from "polotno/side-panel";
import { Workspace } from "polotno/canvas/workspace";
import { unstable_useHtmlTextRender } from "polotno/config";
import "@blueprintjs/core/lib/css/blueprint.css";
import { createStore } from "polotno/model/store";
import { observer } from "mobx-react-lite";
import {
  quillRef,
  createQuill,
  setQuillContent,
} from "polotno/canvas/html-element";
import { Button } from "@blueprintjs/core";

import { unstable_setQuillFormats } from "polotno/config";

unstable_setQuillFormats([
  // default list of formats
  "bold",
  "color",
  "font",
  "italic",
  "size",
  "strike",
  "underline",
  "indent",
  "list",
  "direction",
  // add additional format
  "sub",
  "sup",
]);

import Quill from "quill";
const Inline = Quill.import("blots/inline");

// Subscript blot
class Sub extends Inline {}
Sub.blotName = "sub";
Sub.tagName = "sub";
Quill.register(Sub);

// Superscript blot
class Sup extends Inline {}
Sup.blotName = "sup";
Sup.tagName = "sup";
Quill.register(Sup);

unstable_useHtmlTextRender(true);

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T", // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
const page = store.addPage();

store.activePage.addElement({
  type: "text",
  text: 'Hello <strong>from rich</strong> <u>text</u> <span style="color: red;">support</span>!',
  y: 300,
  x: store.width / 2 - 200,
  fontSize: 80,
  width: 400,
});

const createTempQuill = ({ html }) => {
  const el = document.createElement("div");
  document.body.appendChild(el);
  // el.innerHTML = html;
  el.style.display = "none";
  el.style.whiteSpace = "pre-wrap";
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
              "user"
            );
            return;
          }

          // if whole text selected, let's remove bold from inner
          quill = createTempQuill({ html: element.text });
          quill.setSelection(0, quill.getLength(), "api");
          const formatData = quill.getFormat();
          quill.format(format, !formatData[format]);
          const innerHtml = quill.root.innerHTML;
          removeTempQuill(quill);
          element.set({ text: innerHtml });
        }}
      />
    );
  }
);

export const TextSub = observer(({ element, store }) => {
  return (
    <ToggleButton
      format="sub"
      active={quillRef.currentFormat.sub}
      element={element}
      text="Sub"
    />
  );
});

export const TextSup = observer(({ element, store }) => {
  return (
    <ToggleButton
      format="sup"
      active={quillRef.currentFormat.sub}
      element={element}
      text="Sup"
    />
  );
});

export const App = ({ store }) => {
  return (
    <PolotnoContainer style={{ width: "100vw", height: "100vh" }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar
          store={store}
          components={{
            TextSub,
            TextSup,
          }}
        />
        <Workspace store={store} />
        <ZoomButtons store={store} />
        <PagesTimeline store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App store={store} />);
