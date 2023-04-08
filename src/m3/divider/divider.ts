import BaseElement from '../../base/base/element.js';
import { css } from '../../utils/template.js';

export const M3DividerStyles = css`
  :host {
    box-sizing: border-box;
    color: var(--md-sys-color-outline);
    display: flex;
    height: 1px;
    width: 100%;
  }

  :host([inset]),
  :host([inset-start]) {
    padding-inline-start: 16px;
  }

  :host([inset]),
  :host([inset-end]) {
    padding-inline-end: 16px;
  }

  :host::before {
    background: currentColor;
    content: '';
    height: 100%;
    width: 100%;
  }

  @media (forced-colors: active) {
    :host::before {
      background: CanvasText;
    }
  }
`;

const attrs = {
  bool: ['inset', 'inset-start', 'inset-end'],
};

export default class M3Divider extends BaseElement {
  override styles(): CSSStyleSheet[] {
    return [M3DividerStyles];
  }

  static get observedAttributes() {
    return [...attrs.bool];
  }

  get inset() {
    return this.hasAttribute('inset');
  }
  set inset(value: boolean) {
    this.toggleAttribute('inset', value);
  }
  get insetStart() {
    return this.hasAttribute('inset-start');
  }
  set insetStart(value: boolean) {
    this.toggleAttribute('inset-start', value);
  }
  get insetEnd() {
    return this.hasAttribute('inset-end');
  }
  set insetEnd(value: boolean) {
    this.toggleAttribute('inset-end', value);
  }
}

customElements.define('md-divider', M3Divider);
declare global {
  interface HTMLElementTagNameMap {
    'md-divider': M3Divider;
  }
}
