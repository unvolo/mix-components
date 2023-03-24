export type PropertyTypes =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor

export default class BaseElement extends HTMLElement {
  constructor() {
    super()
  }

  delegatesFocus: boolean = false

  renderTimes = 0
  _render() {
    const _shadowRoot =
      this.shadowRoot ||
      this.attachShadow({ mode: 'open', delegatesFocus: this.delegatesFocus })
    _shadowRoot.innerHTML = ``
    _shadowRoot.appendChild(this.render().cloneNode(true))
    _shadowRoot.adoptedStyleSheets = [
      ...document.adoptedStyleSheets,
      ...this.styles(),
    ]
    this.renderTimes++
  }
  render?(): DocumentFragment {
    return new DocumentFragment()
  }
  styles?(): Array<CSSStyleSheet> {
    return []
  }

  adoptedCallback?(): void
  attributeChangedCallback(
    name: string,
    oldValue: string | undefined,
    newValue: string | undefined
  ): void {
    if (oldValue === newValue) return

    if (Object.keys(this.defaultAttrs).includes(name)) this._fillDefaultAttrs()
  }
  connectedCallback(): void {
    this._fillDefaultAttrs()
    this._render()
  }
  disconnectedCallback?(): void

  // Utils
  $(selectors: string): any {
    return this.shadowRoot.querySelector(selectors)
  }
  _syncAttribute(
    target: HTMLElement,
    name: string,
    type: PropertyTypes,
    dataPrefix: boolean = false
  ) {
    name = dataPrefix ? name.replace('data-', '') : name
    let outerName = `${dataPrefix ? 'data-' : ''}${name}`
    switch (type) {
      case String:
      case Number:
        this.hasAttribute(outerName)
          ? target.setAttribute(name, this.getAttribute(outerName))
          : target.removeAttribute(name)
        break

      case Boolean:
        target.toggleAttribute(name, this.hasAttribute(outerName))
        break

      default:
        break
    }
  }
  #spinLockOfAttrRemoving = 0
  _fixNotDataPAttr(name: string, type: PropertyTypes) {
    if (this.#spinLockOfAttrRemoving) {
      this.#spinLockOfAttrRemoving--
      return
    }
    this.#spinLockOfAttrRemoving++
    switch (type) {
      case String:
      case Number:
        this.setAttribute('data-' + name, this.getAttribute(name)) // Will active this.syncAttribute
        break

      case Boolean:
        this.toggleAttribute('data-' + name, this.hasAttribute(name)) // Will active this.syncAttribute
        break

      default:
        break
    }
    this.removeAttribute(name)
  }
  defaultAttrs?: object = {}
  _fillDefaultAttrs() {
    for (let key of Object.keys(this.defaultAttrs)) {
      // @ts-ignore
      const value: string = this.defaultAttrs[key]
      !this.getAttribute(key) ? this.setAttribute(key, value) : null
    }
  }
}
