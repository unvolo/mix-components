import BaseElement from '../base/element.js';
import DelegateFocusMixin from '../mixins/delegate-focus-mixin.js';
import FocusDetectMixin from '../mixins/focus-detect-mixin.js';
import { html, css } from '../../utils/template.js';
import { dataPrefixed, ifDefined } from '../../utils/attributes.js';

/**
 * Input types that are compatible with the text field.
 */
export type TextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

/**
 * Input types that are not fully supported for the text field.
 */
export type UnsupportedTextFieldType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'file'
  | 'month'
  | 'time'
  | 'week';

/**
 * Input types that are incompatible with the text field.
 */
export type InvalidTextFieldType =
  | 'button'
  | 'checkbox'
  | 'hidden'
  | 'image'
  | 'radio'
  | 'range'
  | 'reset'
  | 'submit';

export const BaseInputStyles = css``;

const attrs = {
  string: ['label'],
  bool: ['disabled'],
};
const dataPAttrs = {
  string: dataPrefixed(['aria-label']),
};

export default class BaseInput extends DelegateFocusMixin(
  FocusDetectMixin(BaseElement)
) {
  override render(): DocumentFragment {
    return html`<input part="input" />`;
  }
  override styles(): CSSStyleSheet[] {
    return [BaseInputStyles];
  }

  get $input(): HTMLInputElement {
    return this.$('[part~="input"]');
  }

  static get observedAttributes() {
    return [...attrs.string];
  }
}
