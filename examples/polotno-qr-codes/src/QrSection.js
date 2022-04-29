import React from "react";
import { observer } from "mobx-react-lite";
import { SectionTab } from "polotno/side-panel";
import QRCode from "qrcode";
import * as svg from "polotno/utils/svg";
import ImQrcode from "@meronex/icons/im/ImQrcode";
import { Button, InputGroup } from "@blueprintjs/core";

// create svg image for QR code for input text
async function getQR(text) {
  return new Promise((resolve) => {
    QRCode.toString(
      text || "no-data",
      {
        type: "svg",
        color: {
          dark: "#00F", // Blue dots
          light: "#0000" // Transparent background
        }
      },
      (err, string) => {
        resolve(svg.svgToURL(string));
      }
    );
  });
}

// define the new custom section
export const QrSection = {
  name: "qr",
  Tab: (props) => (
    <SectionTab name="Qr" {...props}>
      <ImQrcode />
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    const [val, setVal] = React.useState("");

    const el = store.selectedElements[0];
    const isQR = el?.name === "qr";

    // if selection is changed we need to update input value
    React.useEffect(() => {
      if (el?.custom.value) {
        setVal(el?.custom.value);
      }
    }, [isQR, el]);

    // update image src when we change input data
    React.useEffect(() => {
      if (isQR) {
        getQR(val).then((src) => {
          el.set({
            src,
            custom: {
              value: val
            }
          });
        });
      }
    }, [el, val, isQR]);

    return (
      <div>
        {isQR && <p>Update select QR code:</p>}
        {!isQR && <p>Create new QR code:</p>}
        <InputGroup
          onChange={(e) => {
            setVal(e.target.value);
          }}
          placeholder="Type qr code content"
          value={val}
          style={{ width: "100%" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px"
          }}
        >
          <Button
            style={{
              display: isQR ? "" : "none"
            }}
            onClick={() => {
              store.selectElements([]);
              setVal("");
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              display: isQR ? "none" : ""
            }}
            onClick={async () => {
              const src = await getQR(val);

              store.activePage.addElement({
                type: "svg",
                name: "qr",
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                src,
                custom: {
                  value: val
                }
              });
            }}
          >
            Add new QR code
          </Button>
        </div>
      </div>
    );
  })
};
