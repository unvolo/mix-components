import BaseButton from '../../base/base/button.js';
import { html, css } from '../../utils/template.js';
import StateLayerStyles from '../styles/state-layer-styles.js';
import FocusRingStyles from '../styles/focus-ring-styles.js';

import '../shared/target.js';
import '../ripple/ripple.js';

export const M3IconButtonStyles = css`
  [part~='button'] {
    border-radius: var(--md-sys-shape-corner-full);
    height: 40px;
    transition: box-shadow var(--md-sys-motion-duration-medium2)
      var(--md-sys-motion-easing-standard);
    width: 40px;
    z-index: var(--md-sys-elev-0);
  }
  /* Colors */
  :host {
    --md-button-theme-color: var(--md-sys-color-primary);
    --md-button-on-theme-color: var(--md-sys-color-on-primary);
  }
  :host([color='secondary']) {
    --md-button-theme-color: var(--md-sys-color-secondary);
    --md-button-on-theme-color: var(--md-sys-color-on-secondary);
  }
  :host([color='tertiary']) {
    --md-button-theme-color: var(--md-sys-color-tertiary);
    --md-button-on-theme-color: var(--md-sys-color-on-tertiary);
  }
  /* Variants */
  :host([variant='text']) [part~='button'] {
    color: var(--md-button-theme-color);
  }
  :host([variant='text'][disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([variant='outlined']) [part~='button'] {
    border: 1px solid var(--md-sys-color-outline);
    color: var(--md-button-theme-color);
  }
  :host([variant='outlined'][disabled]) [part~='button'] {
    border-color: rgba(var(--md-sys-color-on-surface-rgb), 0.12);
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([variant='filled']) [part~='button'] {
    background-color: var(--md-button-theme-color);
    color: var(--md-button-on-theme-color);
  }
  :host([variant='filled tonal']) [part~='button'] {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
  }
  :host([variant~='filled'][disabled]) [part~='button'] {
    background: rgba(var(--md-sys-color-on-surface-rgb), 0.12);
    box-shadow: none;
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  @media (hover: hover) {
    :host([variant~='filled']) [part~='button']:hover:not(:active) {
      box-shadow: var(--md-sys-elev-shadow-1);
    }
  }

  [part='icon-root'] {
    display: inline-flex;
  }

  ::slotted(md-icon),
  ::slotted(md-animated-icon),
  ::slotted(iconify-icon) {
    width: 1.125rem;
    height: 1.125rem;
    font-size: var(--md-button-icon-size, 1.125rem);
  }
`;

const defaultAttrs = {
  variant: 'text',
  color: 'primary',
};

export type M3IconButtonVariants =
  | 'text'
  | 'outlined'
  | 'filled'
  | 'filled tonal';
export type M3IconButtonColors = 'primary' | 'secondary' | 'tertiary';

export default class M3IconButton extends BaseButton {
  override renderContents() {
    return html`
      <md-ripple></md-ripple>
      <span part="state-layer"></span>
      <span part="focus-ring"></span>
      <md-target></md-target>
      <span part="icon-root"><slot></slot></span>
    `;
  }
  override styles() {
    return [
      ...super.styles(),
      M3IconButtonStyles,
      StateLayerStyles,
      FocusRingStyles,
    ];
  }

  get $ripple() {
    return this.$('md-ripple');
  }

  static override get observedAttributes(): string[] {
    return [...super.observedAttributes, ...Object.keys(defaultAttrs)];
  }

  override defaultAttrs = defaultAttrs;

  get variant() {
    return this.getAttribute('variant') as M3IconButtonVariants;
  }
  set variant(value: M3IconButtonVariants) {
    this.setAttribute('variant', value);
  }

  get color() {
    return this.getAttribute('color') as M3IconButtonColors;
  }
  set color(value: M3IconButtonColors) {
    this.setAttribute('color', value);
  }
}

customElements.define('md-icon-button', M3IconButton);
declare global {
  interface HTMLElementTagNameMap {
    'md-icon-button': M3IconButton;
  }
}
