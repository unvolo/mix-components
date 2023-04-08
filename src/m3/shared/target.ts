import BaseElement from '../../base/base/element.js';
import { css } from '../../utils/template.js';

export const M3TargetStyles = css`
  :host {
    box-sizing: border-box;
    height: 100%;
    left: 50%;
    min-height: 48px;
    min-width: 48px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`;

const defaultAttrs = {
  'aria-hidden': 'true',
};

export default class M3Target extends BaseElement {
  override styles(): CSSStyleSheet[] {
    return [M3TargetStyles];
  }

  override defaultAttrs = defaultAttrs;
}

customElements.define('md-target', M3Target);
declare global {
  interface HTMLElementTagNameMap {
    'md-target': M3Target;
  }
}
