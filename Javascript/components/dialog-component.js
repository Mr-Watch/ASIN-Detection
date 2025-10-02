import { stringToLinkNode, stringToNode, stringToStyleSheetNode } from "../utils.js"

class dialogComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" })

        this.shadowRoot.appendChild(stringToLinkNode("https://fonts.googleapis.com/icon?family=Material+Icons"))

        this.shadowRoot.appendChild(stringToStyleSheetNode(`
        dialog {
            margin-top: 100px;
            border-radius: 10px;
            max-width: 700px;
            min-height: 300px;
        }

        h1 {
            text-align: center;
            display: inline;
            padding: 0px 10px 0px 10px;
         }

        main {
            margin: 30px 10px 10px 10px;
            font-size: 20px;
        }`))

        this.shadowRoot.appendChild(stringToNode(`
        <dialog closedby="any">
        <i
            class="material-icons"
            style="
            font-size: 50px;
            user-select: none;
            cursor: pointer;
            float: right;
            "
            >close</i
        >
        <h1>Title</h1>
        <main>
        Body
        </main>
        </dialog>`))

        this.elements = {}
        this.elements.dialog = this.shadowRoot.querySelector("dialog")
        this.elements.title = this.shadowRoot.querySelector("h1")
        this.elements.body = this.shadowRoot.querySelector("main")
        this.elements.close = this.shadowRoot.querySelector("i")

        this.elements.close.addEventListener("click", this.closeDialog.bind(this))

        if (this.dataset.title !== undefined) {
            this.changeTitle(this.dataset.title)
        }

        if (this.dataset.body !== undefined) {
            this.changeBody(this.dataset.body)
        }

        if (this.innerHTML !== "") {
            this.changeBody(this.innerHTML)
        }
    }

    changeTitle(title) {
        this.elements.title.innerText = title
    }

    changeBody(body) {
        this.elements.body.innerHTML = body
    }

    showDialog() {
        this.elements.dialog.showModal()
    }

    closeDialog() {
        this.elements.dialog.close()
    }
}

customElements.define("dialog-component", dialogComponent)

export { dialogComponent }