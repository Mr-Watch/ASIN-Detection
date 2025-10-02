import { stringToNode } from "./utils.js"

async function getHtmlStringFromURL(url) {
    let asin = extractAsinFromURL(url).join("")
    let response = await fetch(`https://api.codetabs.com/v1/proxy?quest=https://www.amazon.com/dp/${asin}?th=1`)
    let responseString = await response.text()
    return responseString
}

async function getProductImage(url) {
    return new Promise(async (resolve) => {
        let htmlString = await getHtmlStringFromURL(url);
        let waitForContents = setInterval(async () => {
            if (/<img.*id="landingImage".*>/gm.exec(htmlString) === null) {
                htmlString = await getHtmlStringFromURL(url);
            } else {
                clearInterval(waitForContents);
                let tempNode = stringToNode(/<img.*id="landingImage".*>/gm.exec(htmlString).join(""))
                resolve(tempNode.src)
            }
        }, 500)
    })
}

async function getProductTitle(url) {
    return new Promise(async (resolve) => {
        let htmlString = await getHtmlStringFromURL(url);
        let waitForContents = setInterval(async () => {
            if (/<span id="productTitle".*<\/span>/gm.exec(htmlString) === null) {
                htmlString = await getHtmlStringFromURL(url);
            } else {
                clearInterval(waitForContents);
                let tempNode = stringToNode(/<span id="productTitle".*<\/span>/gm.exec(htmlString).join(""))
                resolve(tempNode.innerText)
            }
        }, 1000)
    })
}

async function getProductNodeWithRegex(url, regex) {
    return new Promise(async (resolve, reject) => {
        let htmlString = await getHtmlStringFromURL(url);
        let waitForContents = setInterval(async () => {
            if (regex.exec(htmlString) === null) {
                htmlString = await getHtmlStringFromURL(url);
            } else {
                clearInterval(waitForContents);
                let tempNode = stringToNode(regex.exec(htmlString).join(""))
                resolve(tempNode)
            }
        }, 500)
    })
}

function extractAsinFromURL(url) {
    return /[A-Z|0-9]{10}/gm.exec(url);
}

async function checkURLValidity(url) {
    try {
        let response = await fetch(url)
        if (!response.ok) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log("URL is not valid")
    }
}


let test = await getProductTitle("https://www.amazon.com/Magicteam-Machine-Looping-Soothing-Function/dp/B07RWRJ4XW?c=ts&dib=eyJ2IjoiMSJ9.Zd8TS31sDQceArQS-zhn8Ce04hcKA6UkearpAEPSIn3MNnYqpMFYkCyAZRYLVYYlxum-D0qQVBBdBbl1rP_q9USsC5beghQWod-JCAO3p8F8DaNMTM_27JHM1cEny9YzOnfb9u8dTNrnaFixvdQN1fDAwP1C2pldeGSXatGAv8c1XhlGhNgqenSi1QY0XIlmZat-sRHcfKylPQC12QehYVZ0qCF2WWneOr5DrTxJDYP5wM1nYBgG8Bz8GWMj2od28rggt3jyfejjVrUsNK_-017qxqQxFYozeFpa_ZCu0UI.9LXhUTanu77UaMenXvoQq_j4W2ES3Kay2O4Bx0RidWI&dib_tag=se&keywords=Sleep+%26+Snoring+Aids&qid=1759424772&s=hpc&sr=1-4&ts_id=3764271")

console.log(test)

let test2 = await getProductImage("https://www.amazon.com/Magicteam-Machine-Looping-Soothing-Function/dp/B07RWRJ4XW")

console.log(test2)

checkURLValidity("https://www.amazon.com/Magicteam-Machine-Looping-Soothing-Function/dp/B07RWRJ4XW");
export { getProductImage, getProductTitle }