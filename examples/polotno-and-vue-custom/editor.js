import {jsxs as $j4U0J$jsxs, jsx as $j4U0J$jsx} from "react/jsx-runtime";
import "react";
import $j4U0J$reactdomclient from "react-dom/client";
import {PolotnoContainer as $j4U0J$PolotnoContainer, SidePanelWrap as $j4U0J$SidePanelWrap, WorkspaceWrap as $j4U0J$WorkspaceWrap} from "polotno";
import {Toolbar as $j4U0J$Toolbar} from "polotno/toolbar/toolbar";
import {ZoomButtons as $j4U0J$ZoomButtons} from "polotno/toolbar/zoom-buttons";
import {SidePanel as $j4U0J$SidePanel} from "polotno/side-panel";
import {Workspace as $j4U0J$Workspace} from "polotno/canvas/workspace";
import {createStore as $j4U0J$createStore} from "polotno/model/store";










const $96449b9a37abcd77$var$store = (0, $j4U0J$createStore)({
    key: "nFA5H9elEytDyPyvKL7T",
    // you can hide back-link on a paid license
    // but it will be good if you can keep it for Polotno project support
    showCredit: true
});
const $96449b9a37abcd77$var$page = $96449b9a37abcd77$var$store.addPage();
const $96449b9a37abcd77$export$86fbec116b87613f = ({ store: store  })=>{
    return /*#__PURE__*/ (0, $j4U0J$jsxs)((0, $j4U0J$PolotnoContainer), {
        style: {
            width: "100%",
            height: "100%"
        },
        children: [
            /*#__PURE__*/ (0, $j4U0J$jsx)((0, $j4U0J$SidePanelWrap), {
                children: /*#__PURE__*/ (0, $j4U0J$jsx)((0, $j4U0J$SidePanel), {
                    store: store
                })
            }),
            /*#__PURE__*/ (0, $j4U0J$jsxs)((0, $j4U0J$WorkspaceWrap), {
                children: [
                    /*#__PURE__*/ (0, $j4U0J$jsx)((0, $j4U0J$Toolbar), {
                        store: store
                    }),
                    /*#__PURE__*/ (0, $j4U0J$jsx)((0, $j4U0J$Workspace), {
                        store: store
                    }),
                    /*#__PURE__*/ (0, $j4U0J$jsx)((0, $j4U0J$ZoomButtons), {
                        store: store
                    })
                ]
            })
        ]
    });
};
const $96449b9a37abcd77$export$eb02d1ee0d3cac30 = ({ container: container  })=>{
    const root = (0, $j4U0J$reactdomclient).createRoot(container);
    root.render(/*#__PURE__*/ (0, $j4U0J$jsx)($96449b9a37abcd77$export$86fbec116b87613f, {
        store: $96449b9a37abcd77$var$store
    }));
};
// make API global for simple start in development
window.createEditor = $96449b9a37abcd77$export$eb02d1ee0d3cac30;


export {$96449b9a37abcd77$export$86fbec116b87613f as App, $96449b9a37abcd77$export$eb02d1ee0d3cac30 as createEditor};
