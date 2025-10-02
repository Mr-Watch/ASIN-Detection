import { stringToNode } from "./utils.js"

async function getHtmlStringFromURL(url) {
    let asin = extractAsinFromURL(url).join("")
    let response = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://www.amazon.com/dp/${asin}?th=1`)
    console.log(response)
    let responseString = await response.text()
    return responseString
}

async function getProductImage(url) {
    let imageNode = await getNodeFromRegex(url, /<img.*id="landingImage".*>/gm)
    return imageNode.src
}

async function getProductTitle(url) {
    let titleNode = await getNodeFromRegex(url, /<span id="productTitle".*<\/span>/gm)
    return titleNode.innerText.trim()
}

async function getNodeFromRegex(url, regex) {
    return new Promise(async (resolve,reject) => {
        let attemptCounter = 15;
        let htmlString = await getHtmlStringFromURL(url);
        let waitForContents = setInterval(async () => {
            let evaluation = regex.exec(htmlString)
            regex.lastIndex = 0
            if (evaluation === null) {
                htmlString = await getHtmlStringFromURL(url);
            } else {
                clearInterval(waitForContents);
                let tempNode = stringToNode(evaluation.join(""))
                resolve(tempNode)
            }
            attemptCounter--;
            if(attemptCounter === 0){
                clearInterval(waitForContents)
                reject(new Error("Invalid URL or Server Timeout"))
            }
            console.log(attemptCounter)
        }, 3000)
    })
}

function extractAsinFromURL(url) {
    return /[A-Z|0-9]{10}/gm.exec(url);
}

export { getProductImage, getProductTitle }