class SearchBox extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.append(SearchBox.template.content.cloneNode(true));

        this.input = this.shadowRoot.querySelector("#input");
        let leftSlot = this.shadowRoot.querySelector('slot[name="left"]');
        let rightSlot = this.shadowRoot.querySelector('slot[name="right"]');

        this.input.onfocus = () => { this.setAttribute("focused", ""); };
        this.input.onblur = () => { this.removeAttribute("focused"); };

        leftSlot.onclick = this.input.onchange = (event) => {
            event.stopPropagation();
            if (this.disabled) return;
            this.dispatchEvent(new CustomEvent("search", {
                detail: this.input.value
            }));
        };

        rightSlot.onclick = (event) => {
            event.stopPropagation();
            if (this.disabled) return;
            let e = new CustomEvent("clear", { cancelable: true });
            this.dispatchEvent(e);
            if (!e.defaultPrevented) {
                this.input.value = "";
            }
        };
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "disabled") {
            this.input.disabled = newValue !== null;
        } else if (name === "placeholder") {
            this.input.placeholder = newValue;
        } else if (name === "size") {
            this.input.size = newValue;
        } else if (name === "value") {
            this.input.value = newValue;
        }
    }

    get placeholder() {
        return this.getAttribute("placeholder");
    }

    get size() {
        return this.getAttribute("size");
    }

    get value() {
        return this.getAttribute("value");
    }

    get disabled() {
        return this.hasAttribute("disabled");
    }

    get hidden() {
        return this.getAttribute("hidden");
    }

    set placeholder(value) {
        this.setAttribute("placeholder", value);
    }

    set size(value) {
        this.setAttribute("size", value);
    }

    set value(text) {
        this.setAttribute("value", text);
    }

    set disabled(value) {
        if (value) this.setAttribute("disabled", "");
        else this.removeAttribute("disabled");
    }

    set hidden(value) {
        if (value) this.setAttribute("hidden", "");
        else this.removeAttribute("hidden");
    }
}

SearchBox.observedAttributes = ["disabled", "placeholder", "size", "value"];

SearchBox.template = document.createElement("template");

SearchBox.template.innerHTML = `
<style>
:host {
  display: inline-block;
  border: solid black 1px;
  border-radius: 5px;
  padding: 4px 6px;
}
:host([hidden]) {
  display: none;
}
:host([disabled]) {
  opacity: 0.5;
}
:host([focused]) {
  box-shadow: 0 0 2px 2px #6AE;
}
input {
  border-width: 0;
  outline: none;
  font: inherit;
  background: inherit;
}
slot {
  cursor: default;
  user-select: none;
}
</style>
<div>
  <slot name="left">\u{1f50d}</slot>
  <input type="text" id="input" />
  <slot name="right">\u{2573}</slot>
</div>
`;

customElements.define("search-box", SearchBox);
