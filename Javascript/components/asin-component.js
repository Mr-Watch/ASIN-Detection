import { stringToLinkNode, stringToNode, stringToStyleSheetNode } from "../utils.js"

class asinComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" })

        this.shadowRoot.appendChild(stringToLinkNode("https://fonts.googleapis.com/icon?family=Material+Icons"))

        this.shadowRoot.appendChild(stringToStyleSheetNode(`
        .asin {
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

        a {
            height: 0px
        }

        u {
	        float: right;
	        position: relative;
	        top: -40px;
	        margin-right: 15px;
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
        <div class="asin">
            <h2>OR Try to find manually the<br>ASIN</h2>
                <input type="text" />
                <a href="javascript:void(0)"><u>see how</u></a>
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
        this.elements.root = this.shadowRoot.querySelector(".asin")
        this.elements.input = this.shadowRoot.querySelector("input")
        this.elements.seeHow = this.shadowRoot.querySelector("u")
        this.elements.error = this.shadowRoot.querySelector(".error")
        this.elements.message = this.shadowRoot.querySelector(".message")

        this.hideError()
        this.hideSeeHow()
        this.hide()
        this.setAttribute("data-trigger", "false")
        this.elements.input.addEventListener("input", this.setValidity.bind(this))
    }

    setValidity() {
        let validity = this.validateASIN(this.elements.input.value);
        if (this.elements.input.value === "") {
            this.elements.input.setCustomValidity("")
            this.hideError()
        } else if (validity) {
            this.elements.input.setCustomValidity("")
            this.hideError()
            this.setAttribute("data-trigger", "true")
        } else {
            this.elements.input.setCustomValidity("This ASIN is invalid")
            this.setMessage("This ASIN is invalid")
            this.showError()
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

    showSeeHow() {
        this.elements.seeHow.style.visibility = "visible"
    }

    hideSeeHow() {
        this.elements.seeHow.style.visibility = "hidden"
    }

    show(){
        this.elements.root.style.visibility = "visible"
    }
    
    hide(){
        this.elements.root.style.visibility = "hidden"
    }

    validateASIN(asin) {
        return /^[A-Z|0-9]{10}$/gm.test(asin)
    }

}

customElements.define("asin-component", asinComponent)

export { asinComponent }