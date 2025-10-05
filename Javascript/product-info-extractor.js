import { stringToNode } from "./utils.js"

async function getHtmlStringFromURL(url) {
    let asin = extractAsinFromURL(url).join("")
    let response = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://www.amazon.com/dp/${asin}?th=1`)
    let responseString = await response.text()
    return responseString
}

function getProductTitle(htmlString) {
    let titleHtml = /<span id="productTitle".*<\/span>/.exec(htmlString).join("")
    let titleNode = stringToNode(titleHtml)
    return titleNode.innerText.trim()
}

function getProductImageURL(htmlString) {
    let imageHtml = /<img.*id="landingImage".*>/.exec(htmlString).join("")
    let imageNode = stringToNode(imageHtml)
    return imageNode.src
}

function getProductWayFinding(htmlString) {
    let wayFindingHtml = /<div id="wayfinding-breadcrumbs_feature_div".*><\/div>/.exec(htmlString).join("")
    return wayFindingHtml
}

async function getCorrectHtmlString(url) {
    return new Promise(async (resolve, reject) => {
        let attemptCounter = 10;
        let regex = /<span id="productTitle".*<\/span>/;
        let htmlString = await getHtmlStringFromURL(url);
        let waitForContents = setInterval(async () => {
            let evaluation = regex.exec(htmlString)
            if (evaluation === null) {
                htmlString = await getHtmlStringFromURL(url);
            } else {
                clearInterval(waitForContents);
                resolve(htmlString)
            }
            attemptCounter--;
            if (attemptCounter === 0) {
                clearInterval(waitForContents)
                reject(new Error("Invalid URL or Server Timeout"))
            }
        }, 1250)
    })
}

function extractAsinFromURL(url) {
    return /[A-Z|0-9]{10}/gm.exec(url);
}

export { getProductTitle, getProductImageURL, getProductWayFinding, getCorrectHtmlString }