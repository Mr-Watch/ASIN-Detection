import { stringToLinkNode, stringToNode, stringToStyleSheetNode } from "../utils.js"

class productURLComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" })

        this.shadowRoot.appendChild(stringToLinkNode("https://fonts.googleapis.com/icon?family=Material+Icons"))

        this.shadowRoot.appendChild(stringToStyleSheetNode(`
        .paste-url {
            display: flex;
            flex-flow: column;
            width: fit-content;
        }

        input {
            height: 40px;
            border-style: solid;
            border-radius: 5px;
            border-width: 3px;
            padding: 0px 15px 0px 15px;
        }

        input:invalid {
            border-color: #f1b8ba;
            box-shadow: 0 0 5px #f1b8ba;
        }

        .error {
            display: flex;
            flex-flow: row;
            align-items: center;
            margin-top: 25px;
        }

        .message {
            margin-left: 15px;
            color: #fa0101; 
        }`))

        this.shadowRoot.appendChild(stringToNode(`
        <div class="paste-url">
            <h2>Paste here the URL of the product that you choose!</h2>
                <input type="text" />
            <div class="error">
                <i class="material-icons" style="font-size: 48px; color: #fa0101"
                >error</i
                >
                <h2 class="message">
                Sorry we didn't find product information at this URL.
                </h2>
            </div>
        </div>`))

        this.elements = {}
    }
}

customElements.define("product-url-component", productURLComponent)

export { productURLComponent }