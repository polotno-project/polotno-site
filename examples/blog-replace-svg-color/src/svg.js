// parse svg string into DOM
export function parseSVG(svgString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  return doc;
}

// get color of element
// we can also check styles of element and other properties like "stroke"
export function getElementColor(el) {
  return el.getAttribute("fill");
}

// find all colors used in svg
export function getColors(svgString) {
  const doc = parseSVG(svgString);
  var elements = doc.getElementsByTagName("*");
  const usedColors = [];
  for (const element of elements) {
    const color = getElementColor(element);
    // if color is defined and uniq we will add it
    if (color && usedColors.indexOf(color) === -1) {
      usedColors.push(color);
    }
  }
  return usedColors;
}

// convert svg string into base64 data URL
export function svgToURL(s) {
  const uri = window.btoa(unescape(encodeURIComponent(s)));
  return "data:image/svg+xml;base64," + uri;
}

// replace colors in svg string
export function replaceColors(svgString, map) {
  // we can do some RegExp magic here
  // but I will just manually check every element
  const doc = parseSVG(svgString);
  var elements = doc.getElementsByTagName("*");

  for (const element of elements) {
    const color = getElementColor(element);
    if (map[color]) {
      element.setAttribute("fill", map[color]);
    }
  }
  var xmlSerializer = new XMLSerializer();
  const str = xmlSerializer.serializeToString(doc);
  return str;
}
