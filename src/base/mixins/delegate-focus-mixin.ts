import { firstFocusableElement } from '../../utils/dom.js';
import { Constructor } from '../../utils/types.js';
import BaseElement from '../base/element.js';

/**
 * @module DelegateFocusMixin
 */
export default function DelegateFocusMixin(Base: Constructor<BaseElement>) {
  return class DelegateFocus extends Base {
    override delegatesFocus: boolean = true;

    override focus(focusOptions: FocusOptions) {
      const focusElement = this.focusTarget;
      if (focusElement) {
        focusElement.focus(focusOptions);
      }
    }

    get focusTarget() {
      return firstFocusableElement(this.shadowRoot);
    }
  };
}
