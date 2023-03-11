import { Constructor } from '../../utils/types.js'
import BaseElement from '../base/element.js'
import { closestFocusableNode } from '../../utils/dom.js'

const focusTest = document.createElement('div')
focusTest.attachShadow({ mode: 'open', delegatesFocus: true })
const focusTestShadowRoot: any = focusTest.shadowRoot
const nativeDelegatesFocus = focusTestShadowRoot.delegatesFocus

/**
 * @module ComposedFocusMixin
 */
export default function ComposedFocusMixin(Base: Constructor<BaseElement>) {
  return class ComposedFocus extends Base {
    composeFocus: boolean = !nativeDelegatesFocus

    override connectedCallback(): void {
      super.connectedCallback()
      this.addEventListener('mousedown', (event) => {
        if (!this.composeFocus) {
          return
        }
        // Only process events for the main (usually left) button.
        if (event.button !== 0) {
          return
        }
        if (event.target instanceof Element) {
          const target = closestFocusableNode(event.target)
          if (target) {
            target.focus()
            event.preventDefault()
          }
        }
      })
    }
  }
}
