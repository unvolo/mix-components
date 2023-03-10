import { css } from '../../utils/template.js'

const StateLayerStyles = css`
  [part~='state-layer'] {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    z-index: 1;
  }
  :host([focus='keyboard']) [part~='state-layer'] {
    opacity: var(--md-sys-states-focus, 0.12);
  }
  @media (hover: hover) {
    [part~='focus']:hover [part~='state-layer'] {
      opacity: var(--md-sys-states-hover, 0.08);
    }
  }
`

export default StateLayerStyles
