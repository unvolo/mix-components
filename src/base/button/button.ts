import BaseElement from '../base/element.js'
import FocusMixin from '../mixins/focus-mixin.js'
import { html, css } from '../../utils/template.js'
import { dataPrefixed, ifDefined } from '../../utils/attributes.js'

export const BaseButtonStyles = css`
  :host {
    display: inline-flex;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    vertical-align: top;
    touch-action: manipulation;
  }
  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }
  :host([hidden]) {
    display: none;
  }
  [part~='button'] {
    align-items: center;
    background: none;
    border: none;
    box-sizing: border-box;
    color: inherit;
    cursor: pointer;
    display: inline-flex;
    flex: 1;
    font: inherit;
    inline-size: 100%;
    justify-content: center;
    margin: 0;
    outline: none;
    padding: 0;
    position: relative;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    z-index: 0;
  }
`

/**
 * Attributes
 */
const attrs = {
  string: ['label'],
  bool: ['disabled'],
}
/**
 * Data prefixed attributes ('data-')
 */
const dataPAttrs = {
  string: dataPrefixed([
    'role',
    'aria-label',
    'aria-labelledby',
    'aria-describedby',
    'aria-haspopup',
    'aria-expanded',
    'aria-controls',
  ]),
}

/**
 * Base Button class
 *
 * It can be
 * - Button (https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 * - Toggle Button (https://www.w3.org/WAI/ARIA/apg/patterns/button/)
 * - Menu Button (https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/)
 */
export default class BaseButton extends FocusMixin(BaseElement) {
  override delegatesFocus = true
  override render() {
    return html`
    <${this.custom || 'button'}
      part="button focus"
      ${ifDefined('disabled', this.disabled, true)}
      ${ifDefined('role', this.role)}
      ${ifDefined('aria-label', this.ariaLabel)}
      ${ifDefined('aria-labelledby', this.ariaLabelledby)}
      ${ifDefined('aria-describedby', this.ariaDescribedby)}
      ${ifDefined('aria-haspopup', this.ariaHasPopup)}
      ${ifDefined('aria-expanded', this.ariaExpanded)}
      ${ifDefined('aria-controls', this.ariaControls)}
      >
      ${this.renderContents()}
    </${(this.custom || 'button').split(' ')[0]}>
    `
  }
  renderContents() {
    return html`<slot></slot>`
  }
  override styles() {
    return [BaseButtonStyles]
  }

  get $button(): HTMLButtonElement {
    return this.$('[part~="button"]')
  }

  static get observedAttributes() {
    return [...attrs.string, ...attrs.bool, ...dataPAttrs.string.all]
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(value: boolean) {
    this.toggleAttribute('disabled', value)
  }

  get custom() {
    return this.getAttribute('custom')
  }
  set custom(value: string) {
    this.setAttribute('custom', value)
  }

  // ARIA Attributes
  override get role() {
    return this.getAttribute('data-role')
  }
  override set role(value) {
    this.setAttribute('data-role', value)
  }

  override get ariaLabel() {
    return this.getAttribute('data-aria-label')
  }
  override set ariaLabel(value) {
    this.setAttribute('data-aria-label', value)
  }

  get ariaLabelledby() {
    return this.getAttribute('data-aria-labelledby')
  }
  set ariaLabelledby(value) {
    this.setAttribute('data-aria-labelledby', value)
  }

  get ariaDescribedby() {
    return this.getAttribute('data-aria-describedby')
  }
  set ariaDescribedby(value) {
    this.setAttribute('data-aria-describedby', value)
  }

  override get ariaHasPopup() {
    return this.getAttribute('data-aria-haspopup')
  }
  override set ariaHasPopup(value) {
    this.setAttribute('data-aria-haspopup', value)
  }

  override get ariaExpanded() {
    return this.getAttribute('data-aria-expanded')
  }
  override set ariaExpanded(value) {
    this.setAttribute('data-aria-expanded', value)
  }

  get ariaControls() {
    return this.getAttribute('data-aria-controls')
  }
  set ariaControls(value) {
    this.setAttribute('data-aria-controls', value)
  }

  override attributeChangedCallback(
    name: string,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    super.attributeChangedCallback?.(name, oldValue, newValue)
    if (oldValue === newValue) return

    if (attrs.bool.includes(name))
      this._syncAttribute(this.$button, name, Boolean)
    else if (name === 'custom') this.render()
    else if (dataPAttrs.string.unprefixed.includes(name))
      this._fixNotDataPAttr(name, String)
    else if (dataPAttrs.string.prefixed.includes(name))
      this._syncAttribute(this.$button, name, String, true)
  }

  override focus() {
    this.$button.focus()
  }
  override blur() {
    this.$button.blur()
  }
  override click() {
    this.$button.click()
  }
}
