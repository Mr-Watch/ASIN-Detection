import { productComponent } from "./components/product-component.js";
import { dialogComponent } from "./components/dialog-component.js";
import { productURLComponent } from "./components/product-url-component.js";
import { asinComponent } from "./components/asin-component.js";
import { getProductImage, getProductTitle } from "./product-info-extractor.js"


// console.log(document.querySelector('dialog-component').showDialog())


// let product = document.querySelector("product-component")

// let image = await getProductImage(`https://www.amazon.com/dp/B07RWRJFXW
// `)

// let title = await getProductTitle(`https://www.amazon.com/dp/B07RWRJFXW
// `)
// product.setName("Magic Can")
// product.setImage("https://m.media-amazon.com/images/S/aplus-media/sc/462e3bb2-3dd0-4a51-b9ad-c12f2c9c2bcd.__CR0,0,970,600_PT0_SX970_V1___.jpg")

document.querySelector("#next").addEventListener("click", () => {
    alert('What is next... Who knows?')
})

const asinNode = document.querySelector("asin-component");
const productURLNode = document.querySelector("product-url-component");
const productNode = document.querySelector("product-component");
const submitButton = document.querySelector("button")

function setupProduct(direction = "center") {

    switch (direction) {
        case "center":
            document.querySelector("#product-container").style.justifyContent = direction
            break;
        case "right":
            document.querySelector("#product-container").style.justifyContent = "end"
            break;

    }

    if (direction === "center") {
    }
    productNode.setName("Test");
    productNode.setImage("https://m.media-amazon.com/images/S/aplus-media/sc/462e3bb2-3dd0-4a51-b9ad-c12f2c9c2bcd.__CR0,0,970,600_PT0_SX970_V1___.jpg")
    enableAllTextarea();
    submitButton.disabled = false
}

function reverseSetupProduct() {
    productNode.setName("");
    productNode.setImage("")
    disableAllTextarea();
    submitButton.disabled = true
}

setupProduct()
let elementsToFunctions = {

}



function enableAllTextarea() {
    document.querySelectorAll("textarea").forEach((textarea) => {
        textarea.disabled = false;
    })
}

function disableAllTextarea() {
    document.querySelectorAll("textarea").forEach((textarea) => {
        textarea.disabled = true;
    })
}



const config = { attributes: true, attributeOldValue: true };

const callback = (mutationRecordArray) => {
    for (const record of mutationRecordArray) {
        console.log(`Old value: ${record.oldValue}`)
        console.log(record)
        console.log(record.target.id)
    }
};

const observer = new MutationObserver(callback)
observer.observe(asinNode, config)
observer.observe(productURLNode, config)


window.a = setupProduct;
window.b = reverseSetupProduct;

reverseSetupProduct()