import React from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import * as svg from "polotno/utils/svg";
// import our own icon
import FaSignature from "@meronex/icons/fa/FaSignature";
import SignaturePad from "signature_pad";
import { Button } from "@blueprintjs/core";

// define the new custom section
export const SignatureSection = {
  name: "signature",
  Tab: (props) => (
    <SectionTab name="Signature" {...props}>
      <FaSignature />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const ref = React.useRef();
    const pad = React.useRef();

    React.useEffect(() => {
      ref.current.width = ref.current.parentElement.offsetWidth;
      pad.current = new SignaturePad(ref.current);
    }, []);

    return (
      <div>
        Draw your signature:
        <canvas
          ref={ref}
          style={{ border: "1px solid grey", borderRadius: "5px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              pad.current.clear();
            }}
          >
            Clear
          </Button>
          <Button
            onClick={() => {
              const src = pad.current.toDataURL("image/svg+xml");
              store.activePage.addElement({
                type: "svg",
                x: 659,
                y: 721,
                width: ref.current.width,
                height: ref.current.height,
                src
              });
            }}
          >
            Add to document
          </Button>
        </div>
      </div>
    );
  })
};
