import { settings } from "./../settings";
function compareVersions(a: any, b: any) {
  var i, diff;
  var regExStrip0 = /(\.0+)+$/;
  var segmentsA = a.replace(regExStrip0, "").split(".");
  var segmentsB = b.replace(regExStrip0, "").split(".");
  var l = Math.min(segmentsA.length, segmentsB.length);

  for (i = 0; i < l; i++) {
    diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
    if (diff) {
      return diff;
    }
  }
  return segmentsA.length - segmentsB.length;
}
function confirmAction(message: string): boolean {
  if (!!settings && !!settings.confirmActionFunc)
    return settings.confirmActionFunc(message);
  return confirm(message);
}
function detectIEBrowser() {
  if (typeof window === "undefined") return false;
  var ua = window.navigator.userAgent;
  var oldIe = ua.indexOf("MSIE ");
  var elevenIe = ua.indexOf("Trident/");

  return oldIe > -1 || elevenIe > -1;
}
function detectIEOrEdge() {
  if (typeof window === "undefined") return false;
  if (typeof (<any>detectIEOrEdge).isIEOrEdge == "undefined") {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var trident = ua.indexOf("Trident/");
    var edge = ua.indexOf("Edge/");
    (<any>detectIEOrEdge).isIEOrEdge = edge > 0 || trident > 0 || msie > 0;
  }
  return (<any>detectIEOrEdge).isIEOrEdge;
}
function loadFileFromBase64(b64Data: string, fileName: string) {
  try {
    var byteString = atob(b64Data.split(",")[1]);

    // separate out the mime component
    var mimeString = b64Data.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    // write the ArrayBuffer to a blob, and you're done
    var bb = new Blob([ab], { type: mimeString });
    if (
      typeof window !== "undefined" &&
      window.navigator &&
      window.navigator.msSaveBlob
    ) {
      window.navigator.msSaveOrOpenBlob(bb, fileName);
    }
  } catch (err) {}
}
function isMobile() {
  return (
    typeof window !== "undefined" && typeof window.orientation !== "undefined"
  );
}

function isElementVisible(
  element: HTMLElement,
  threshold: number = 0
): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  const elementRect = element.getBoundingClientRect();
  const viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  const topWin = -threshold;
  const bottomWin = viewHeight + threshold;
  const topEl = elementRect.top;
  const bottomEl = elementRect.bottom;

  const maxTop = Math.max(topWin, topEl);
  const minBottom = Math.min(bottomWin, bottomEl);
  return maxTop <= minBottom;
}

function findScrollableParent(element: HTMLElement): HTMLElement {
  if (!element) {
    return document.documentElement;
  }
  if (
    element.scrollHeight > element.clientHeight &&
    (getComputedStyle(element).overflowY === "scroll" ||
      getComputedStyle(element).overflowY === "auto")
  ) {
    return element;
  } else {
    return findScrollableParent(element.parentElement);
  }
}

function createSvg(
  size: number,
  width: number,
  height: number,
  iconName: string,
  svgElem: any
) {
  svgElem.style.width = (size || width || 16) + "px";
  svgElem.style.height = (size || height || 16) + "px";
  var node: any = svgElem.childNodes[0];
  node.setAttributeNS(
    "http://www.w3.org/1999/xlink",
    "xlink:href",
    "#" + iconName
  );
}

export {
  compareVersions,
  confirmAction,
  detectIEOrEdge,
  detectIEBrowser,
  loadFileFromBase64,
  isMobile,
  isElementVisible,
  findScrollableParent,
  createSvg,
};
