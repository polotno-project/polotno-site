import React from "react";
import { Navbar, Button } from "@blueprintjs/core";
import { observer } from "mobx-react-lite";

export const Preview = observer(({ store }) => {
  const [previewVisible, setPreviewVisible] = React.useState(true);
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    // when loading for all fonts
    store.waitLoading().then(() => {
      setContent(store.toDataURL({ ignoreBackground: true }));
    });
    store.on("change", () => {
      setContent(store.toDataURL({ ignoreBackground: true }));
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: 0,
        zIndex: 10,
        zIndex: 10000,
        transformOrigin: "top left",
        background: "white",
        border: "1px solid rgba(16, 22, 26, 0.2)",
        borderRadius: "5px",
        overflow: "hidden"
      }}
    >
      <Navbar>
        <Navbar.Group align="right">
          {previewVisible && (
            <Button
              icon="eye-off"
              minimal
              onClick={() => {
                setPreviewVisible(false);
              }}
            >
              Hide preview
            </Button>
          )}
          {!previewVisible && (
            <Button
              icon="eye-on"
              minimal
              onClick={() => {
                setPreviewVisible(true);
              }}
            >
              Show preview
            </Button>
          )}
        </Navbar.Group>
      </Navbar>
      <div
        className="preview-container"
        style={{ display: previewVisible ? "" : "none", position: "relative" }}
      >
        <img src="./book-cover.jpeg" style={{ width: "300px" }} />
        <img
          src={content}
          style={{
            position: "absolute",
            top: "35px",
            left: "80px",
            width: "150px",
            border: "1px solid lightgrey"
          }}
        />
      </div>
    </div>
  );
});
