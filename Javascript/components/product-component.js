import {
  stringToLinkNode,
  stringToNode,
  stringToStyleSheetNode,
} from "../utils.js";

class productComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(
      stringToLinkNode(
        "https://fonts.googleapis.com/icon?family=Material+Icons"
      )
    );

    this.shadowRoot.appendChild(
      stringToStyleSheetNode(`
     .product {
        display: flex;
        align-items: center;
      }
        
      img {
        max-height: 150px;
        max-width: 150px;
        padding-right: 35px;
      }

      p {
        margin: 2px;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
        
      h3 {
        color: #16bb2c;
        margin: 2px;
      }`)
    );

    this.shadowRoot.appendChild(
      stringToNode(`
        <div class="product">
          <img src="" alt="product image" />
        <i
        class="material-icons"
        style="font-size: 50px;
               color: #16bb2c;
               padding-right: 10px;
               user-select: none;"
        >check_circle</i>
        <div>
          <p>
          </p>
          <h3>This is a valid product</h3>
      </div>
      </div>`)
    );

    this.elements = {};
    this.elements.product = this.shadowRoot.querySelector(".product");
    this.elements.name = this.shadowRoot.querySelector("p");
    this.elements.image = this.shadowRoot.querySelector("img");

    this.hideProduct();

    if (this.dataset.name !== undefined) {
      this.setName(this.dataset.name);
      this.showProduct();
    }

    if (this.dataset.imageURl !== undefined) {
      this.setImage(this.dataset.image);
    }
  }

  setName(name) {
    this.elements.name.innerText = name;
    if (name !== "") {
      this.showProduct();
    } else {
      this.hideProduct();
    }
  }

  setImage(imageURL) {
    this.elements.image.src = imageURL;
  }

  showProduct() {
    this.elements.product.style.display = "";
  }

  hideProduct() {
    this.elements.product.style.display = "none";
  }
}

customElements.define("product-component", productComponent);

export { productComponent };
