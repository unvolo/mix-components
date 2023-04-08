import BaseButton from '../../base/base/button.js';
import { html, css } from '../../utils/template.js';
import { TypographySystem } from '../styles/index.js';
import StateLayerStyles from '../styles/state-layer-styles.js';
import FocusRingStyles from '../styles/focus-ring-styles.js';

import '../shared/target.js';
import '../ripple/ripple.js';

export const M3CommonButtonStyles = css`
  [part~='button'] {
    border-radius: var(--md-sys-shape-corner-full);
    height: 40px;
    transition: box-shadow var(--md-sys-motion-duration-medium2)
      var(--md-sys-motion-easing-standard);
    z-index: var(--md-sys-elev-0);

    ${TypographySystem.generateStyle('label-large')}
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
    min-width: 48px;
    padding: 0 12px;
  }
  :host([variant='text'][disabled]) [part~='button'] {
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host(:not([variant='text'])) [part~='button'] {
    min-width: 64px;
  }
  :host([variant='outlined']) [part~='button'] {
    border: 1px solid var(--md-sys-color-outline);
    color: var(--md-button-theme-color);
    padding: 0 23px;
  }
  :host([variant='outlined'][disabled]) [part~='button'] {
    border-color: rgba(var(--md-sys-color-on-surface-rgb), 0.12);
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  :host([variant='filled']) [part~='button'] {
    background-color: var(--md-button-theme-color);
    color: var(--md-button-on-theme-color);
    padding: 0 24px;
  }
  :host([variant='filled tonal']) [part~='button'] {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
    padding: 0 24px;
  }
  :host([variant='elevated']) [part~='button'] {
    background: var(--md-sys-elev-surface-1);
    box-shadow: var(--md-sys-elev-shadow-1);
    color: var(--md-sys-color-primary);
    padding: 0 24px;
    z-index: var(--md-sys-elev-1);
  }
  :host([variant='filled'][disabled]) [part~='button'],
  :host([variant='elevated'][disabled]) [part~='button'] {
    background: rgba(var(--md-sys-color-on-surface-rgb), 0.12);
    box-shadow: none;
    color: rgba(var(--md-sys-color-on-surface-rgb), 0.38);
  }
  @media (hover: hover) {
    :host([variant~='filled']) [part~='button']:hover:not(:active) {
      box-shadow: var(--md-sys-elev-shadow-1);
    }
    :host([variant='elevated']) [part~='button']:hover:not(:active) {
      box-shadow: var(--md-sys-elev-shadow-2);
    }
  }

  [part='leading-root'],
  [part='trailing-root'] {
    display: inline-flex;
  }
  [part='leading-root'] {
    margin-inline-start: -8px;
    margin-inline-end: 8px;
  }
  [part='trailing-root'] {
    margin-inline-start: 8px;
    margin-inline-end: -8px;
  }
  :host([variant='text'][leading]) [part~='button'] {
    padding-inline-start: 20px;
    padding-inline-end: 16px;
  }
  :host([variant='text'][trailing]) [part~='button'] {
    padding-inline-start: 16px;
    padding-inline-end: 20px;
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

export type M3CommonButtonVariants =
  | 'text'
  | 'outlined'
  | 'filled'
  | 'filled-tonal'
  | 'elevated';
export type M3CommonButtonColors = 'primary' | 'secondary' | 'tertiary';

export default class M3CommonButton extends BaseButton {
  override renderContents() {
    return html`
      <md-ripple></md-ripple>
      <span part="state-layer"></span>
      <span part="focus-ring"></span>
      <md-target></md-target>
      <span part="leading-root"
        ><slot name="leading" part="leading"></slot
      ></span>
      <span part="label-root"><slot></slot></span>
      <span part="trailing-root"
        ><slot name="trailing" part="trailing"></slot
      ></span>
    `;
  }
  override styles() {
    return [
      ...super.styles(),
      M3CommonButtonStyles,
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
    return this.getAttribute('variant') as M3CommonButtonVariants;
  }
  set variant(value: M3CommonButtonVariants) {
    this.setAttribute('variant', value);
  }

  get color() {
    return this.getAttribute('color') as M3CommonButtonColors;
  }
  set color(value: M3CommonButtonColors) {
    this.setAttribute('color', value);
  }
}

customElements.define('md-button', M3CommonButton);
declare global {
  interface HTMLElementTagNameMap {
    'md-button': M3CommonButton;
  }
}
