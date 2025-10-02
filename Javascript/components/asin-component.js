import { stringToLinkNode, stringToNode, stringToStyleSheetNode } from "../utils.js"

class asinComponent extends HTMLElement {
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
            <h2>OR Try to find manually the ASIN</h2>
                <input type="text" />
            <div class="error">
                <i class="material-icons" style="font-size: 48px; color: #fa0101"
                >error</i
                >
                <h2 class="message">
                Sorry we didn't find product information about this ASIN.
                </h2>
            </div>
        </div>`))

        this.elements = {}
        this.elements.input = this.shadowRoot.querySelector("input")
        this.elements.error = this.shadowRoot.querySelector(".error")
        this.elements.message = this.shadowRoot.querySelector(".message")

        this.hideError()
        this.elements.input.addEventListener("input", this.setValidity.bind(this))
    }

    setValidity() {
        let validity = this.validateASIN(this.elements.input.value);
        if (this.elements.input.value === "" || validity) {
            this.elements.input.setCustomValidity("")
            this.hideError()
        } else {
            this.elements.input.setCustomValidity("This ASIN is invalid")
            this.setMessage("This ASIN is invalid")
            this.showError()
        }
    }

    setMessage(message) {
        this.elements.message.innerText = message;
    }

    hideError() {
        this.elements.error.style.visibility = "hidden"
    }

    showError() {
        this.elements.error.style.visibility = ""
    }

    validateASIN(asin) {
        return /^[A-Z|0-9]{10}$/gm.test(asin)
    }

}

customElements.define("asin-component", asinComponent)

export { asinComponent }