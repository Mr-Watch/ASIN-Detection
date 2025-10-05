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
        this.elements.close = this.shadowRoot.querySelector("i")
        this.elements.title = this.shadowRoot.querySelector("h1")
        this.elements.body = this.shadowRoot.querySelector("main")

        this.elements.close.addEventListener("click", this.hide.bind(this))

        if (this.dataset.title !== undefined) {
            this.setTitle(this.dataset.title)
        }

        if (this.dataset.body !== undefined) {
            this.setBody(this.dataset.body)
        }

        if (this.innerHTML !== "") {
            this.setBody(this.innerHTML)
        }
    }

    setTitle(title) {
        this.elements.title.innerText = title
    }

    setBody(body) {
        this.elements.body.innerHTML = body
    }

    show() {
        this.elements.dialog.showModal()
    }

    hide() {
        this.elements.dialog.close()
    }
}

customElements.define("dialog-component", dialogComponent)

export { dialogComponent }