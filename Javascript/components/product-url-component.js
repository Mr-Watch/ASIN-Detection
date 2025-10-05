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
            font-weight: 100;
        }

        input {
            height: 50px;
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
                <i class="material-icons" style="font-size: 48px; color: #fa0101; user-select: none;"
                >error</i
                >
                <h2 class="message">
                Message
                </h2>
            </div>
        </div>`))

        this.elements = {}
        this.elements.input = this.shadowRoot.querySelector("input")
        this.elements.error = this.shadowRoot.querySelector(".error")
        this.elements.message = this.shadowRoot.querySelector(".message")

        this.hideError()
        this.setAttribute("data-valid", "invalid")
        this.elements.input.addEventListener("input", this.setValidity.bind(this))
    }

    setValidity() {
        let validity = this.validateURL(this.elements.input.value);
        if (this.elements.input.value === "") {
            this.elements.input.setCustomValidity("")
            this.hideError()
            window.sendMessage("invalid", "product-url-component")
        } else if (validity) {
            this.elements.input.setCustomValidity("")
            this.hideError()
            window.sendMessage("valid", "product-url-component", this.elements.input.value)
        } else {
            this.elements.input.setCustomValidity("The url is invalid")
            this.setMessage("This url is not valid")
            window.sendMessage("invalid", "product-url-component")
        }
    }

    setMessage(message) {
        this.elements.message.innerText = message
        this.showError()
    }

    showError() {
        this.elements.error.style.visibility = "visible"
    }

    hideError() {
        this.elements.error.style.visibility = "hidden"
    }

    validateURL(url) {
        return /^https?:\/\/www\.amazon\.com\/(?:[a-zA-Z0-9-%\s.]*\/)?dp\/[A-Z0-9]{10}(?:[\/?].*)?$/gm.test(url);
    }
}

customElements.define("product-url-component", productURLComponent)

export { productURLComponent }