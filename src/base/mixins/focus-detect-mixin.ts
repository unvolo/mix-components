import { Constructor } from '../../utils/types.js';
import BaseElement from '../base/element.js';

var fromKeyboard = false;

window.addEventListener(
  'keydown',
  () => {
    fromKeyboard = true;
  },
  { capture: true }
);
window.addEventListener(
  'mousedown',
  () => {
    fromKeyboard = false;
  },
  { capture: true }
);

/**
 * @module FocusDetectMixin
 */
export default function FocusDetectMixin(Base: Constructor<BaseElement>) {
  return class Focus extends Base {
    _handleFocus(_e: FocusEvent) {
      const from = fromKeyboard ? 'keyboard' : 'pointer';
      this.setAttribute('focus', from);
      return from;
    }
    _handleBlur(_e: FocusEvent) {
      this.removeAttribute('focus');
    }

    override connectedCallback() {
      super.connectedCallback?.();
      this.addEventListener('focus', this._handleFocus.bind(this));
      this.addEventListener('blur', this._handleBlur.bind(this));
    }
    override disconnectedCallback() {
      super.disconnectedCallback?.();
      this.removeEventListener('focus', this._handleFocus.bind(this));
      this.removeEventListener('blur', this._handleBlur.bind(this));
    }
  };
}
