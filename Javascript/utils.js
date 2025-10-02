export function validateASIN(asin) {
    return /^[A-Z|0-9]{10}$/gm.test(asin)
}

export function validateURL(url) {
    return /^https:\/\/www\.amazon\.com\/.+\/dp\/[A-Z|0-9]{10}($|(\/.*$))/gm.test(url)
}

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
    let linkNode = document.createElement('link');
    linkNode.setAttribute('rel', 'stylesheet');
    linkNode.setAttribute('href', linkString);
    return linkNode;
}