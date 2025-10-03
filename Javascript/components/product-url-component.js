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
        if (this.elements.input.value === "" || validity) {
            this.elements.input.setCustomValidity("")
            this.hideError()
            this.setAttribute("data-valid", "valid")

        } else {
            this.elements.input.setCustomValidity("The url is invalid")
            this.setMessage("This url is not valid")
            this.showError()
            this.setAttribute("data-valid", "invalid")

        }
    }

    setMessage(message) {
        this.elements.message.innerText = message;
    }

    showError() {
        this.elements.error.style.visibility = "visible"
    }

    hideError() {
        this.elements.error.style.visibility = "hidden"
    }


    validateURL(url) {
        let firstEvaluation = /^https:\/\/www\.amazon\.com\/dp\/[A-Z|\d]{10}($|(\/$))/.test(url);
        let secondEvaluation = /^https:\/\/www\.amazon\.com\/.*\/dp\/[A-Z|\d]{10}[\?|\/].*$/.test(url)
        return firstEvaluation || secondEvaluation ? true : false;
    }

}

customElements.define("product-url-component", productURLComponent)

export { productURLComponent }