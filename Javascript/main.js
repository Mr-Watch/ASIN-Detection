import { productURLComponent } from "./components/product-url-component.js";
import { asinComponent } from "./components/asin-component.js";
import { productComponent } from "./components/product-component.js";
import { dialogComponent } from "./components/dialog-component.js";
import {
  getCorrectHtmlString,
  getProductImageURL,
  getProductTitle,
  getProductWayFinding,
} from "./product-info-extractor.js";

const spinnerNode = document.querySelector(".spinner");
const productURLNode = document.querySelector("product-url-component");
const asinNode = document.querySelector("asin-component");
const productNode = document.querySelector("product-component");
const dropdownNode = document.querySelector("#dropdown-arrow");
const submitButton = document.querySelector("button");
const dialogNode = document.querySelector("dialog-component");
let deg = 0;

dropdownNode.addEventListener("click", () => {
  document.querySelector("#form").classList.toggle("hideTextareaContainer");
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 100);
  dropdownNode.style.transform = `rotate(${(deg += 180)}deg)`;
});

submitButton.addEventListener("click", () => {
  alert("What is next... Who knows?");
});

async function setupProduct(url, messenger) {
  showSpinner();

  if (messenger === "asin-component") {
    document.querySelector("#product-container").style.justifyContent = "end";
    productNode.classList.add("reposition-product");
  } else {
    document.querySelector("#product-container").style.justifyContent =
      "center";
  }

  try {
    let htmlString = await getCorrectHtmlString(url);
    productNode.setName(getProductTitle(htmlString));
    productNode.setImage(getProductImageURL(htmlString));
    dialogNode.setBody(
      "You can find it by following the sections listed bellow on amazon<br>" +
        getProductWayFinding(htmlString)
    );

    if (messenger === "asin-component") {
      asinNode.showSeeHow();
    }

    spinnerNode.style.visibility = "hidden";
    enableAllTextarea();
    submitButton.disabled = false;
  } catch (error) {
    if (messenger === "asin-component") {
      asinNode.setMessage(
        "Sorry we didn't find product information with this ASIN."
      );
    } else {
      productURLNode.setMessage(
        "Sorry we didn't find product information at this URL."
      );
      asinNode.show();
    }

    hideSpinner();
    return;
  }
}

function reverseSetupProduct() {
  productNode.setName("");
  productNode.setImage("");
  productNode.classList.remove("reposition-product");
  disableAllTextarea();
  submitButton.disabled = true;
}

function showSpinner() {
  spinnerNode.style.visibility = "visible";
}

function hideSpinner() {
  spinnerNode.style.visibility = "hidden";
}

function enableAllTextarea() {
  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.disabled = false;
  });
}

function disableAllTextarea() {
  document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.disabled = true;
  });
}

function sendMessage(message, messenger, state) {
  switch (message) {
    case "valid":
      setupProduct(state, messenger);
      break;
    case "invalid":
      if (messenger === "product-url-component") {
        asinNode.hide();
      }
      reverseSetupProduct();
      break;
    case "dialog":
      dialogNode.show();
      break;
    default:
      console.error("Received invalid message");
      break;
  }
}

window.sendMessage = sendMessage;
