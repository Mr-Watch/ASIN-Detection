import { productComponent } from "./components/product-component.js";
import { dialogComponent } from "./components/dialog-component.js";
import { productURLComponent } from "./components/product-url-component.js";
import { asinComponent } from "./components/asin-component.js";
import { getProductImage, getProductTitle } from "./product-info-extractor.js"

// console.log(document.querySelector('dialog-component').showDialog())


let product = document.querySelector("product-component")
console.log(product)

// let image = await getProductImage(`https://www.amazon.com/dp/B07RWRJFXW
// `)

// let title = await getProductTitle(`https://www.amazon.com/dp/B07RWRJFXW
// `)
product.setName("Magic Can")
product.setImage("https://m.media-amazon.com/images/S/aplus-media/sc/462e3bb2-3dd0-4a51-b9ad-c12f2c9c2bcd.__CR0,0,970,600_PT0_SX970_V1___.jpg")

document.querySelector(".next").addEventListener("click",()=>{
    alert('What is next... Who knows?')
})