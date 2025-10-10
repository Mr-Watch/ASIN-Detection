export function stringToNode(nodeString) {
  let doc = new DOMParser().parseFromString(nodeString, "text/html");
  return doc.body.firstChild;
}

export function stringToStyleSheetNode(styleSheetString) {
  let styleSheetNode = document.createElement("style");
  styleSheetNode.innerHTML = styleSheetString;
  return styleSheetNode;
}

export function stringToLinkNode(linkString) {
  let linkNode = document.createElement("link");
  linkNode.setAttribute("rel", "stylesheet");
  linkNode.setAttribute("href", linkString);
  return linkNode;
}
