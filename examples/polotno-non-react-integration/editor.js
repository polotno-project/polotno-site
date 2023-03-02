var $dOdZZ$reactjsxruntime = require("react/jsx-runtime");
require("react");
var $dOdZZ$reactdomclient = require("react-dom/client");
var $dOdZZ$polotno = require("polotno");
var $dOdZZ$polotnotoolbartoolbar = require("polotno/toolbar/toolbar");
var $dOdZZ$polotnotoolbarzoombuttons = require("polotno/toolbar/zoom-buttons");
var $dOdZZ$polotnosidepanel = require("polotno/side-panel");
var $dOdZZ$polotnocanvasworkspace = require("polotno/canvas/workspace");
var $dOdZZ$polotnomodelstore = require("polotno/model/store");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "App", () => $146db43fcad1a62a$export$86fbec116b87613f);









console.log(11111111);


const $146db43fcad1a62a$var$store = (0, $dOdZZ$polotnomodelstore.createStore)({
    key: "nFA5H9elEytDyPyvKL7T",
    // you can hide back-link on a paid license
    // but it will be good if you can keep it for Polotno project support
    showCredit: true
});
const $146db43fcad1a62a$var$page = $146db43fcad1a62a$var$store.addPage();
const $146db43fcad1a62a$export$86fbec116b87613f = ({ store: store  })=>{
    return /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsxs)((0, $dOdZZ$polotno.PolotnoContainer), {
        style: {
            width: "100vw",
            height: "100vh"
        },
        children: [
            /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsx)((0, $dOdZZ$polotno.SidePanelWrap), {
                children: /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsx)((0, $dOdZZ$polotnosidepanel.SidePanel), {
                    store: store
                })
            }),
            /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsxs)((0, $dOdZZ$polotno.WorkspaceWrap), {
                children: [
                    /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsx)((0, $dOdZZ$polotnotoolbartoolbar.Toolbar), {
                        store: store
                    }),
                    /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsx)((0, $dOdZZ$polotnocanvasworkspace.Workspace), {
                        store: store
                    }),
                    /*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsx)((0, $dOdZZ$polotnotoolbarzoombuttons.ZoomButtons), {
                        store: store
                    })
                ]
            })
        ]
    });
};
const $146db43fcad1a62a$var$root = (0, ($parcel$interopDefault($dOdZZ$reactdomclient))).createRoot(document.getElementById("root"));
$146db43fcad1a62a$var$root.render(/*#__PURE__*/ (0, $dOdZZ$reactjsxruntime.jsx)($146db43fcad1a62a$export$86fbec116b87613f, {
    store: $146db43fcad1a62a$var$store
}));


