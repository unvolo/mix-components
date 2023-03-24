import BaseElement from '../../base/base/element.js'
import { html, css } from '../../utils/template.js'

const PREFERS_REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export const M3AnimatedIconStyles = css`
  @media ${PREFERS_REDUCED_MOTION} {
    *,
    *:after,
    *:before {
      animation: none !important;
      transition: none !important;
    }
  }
  [part='icon'] {
    fill: currentColor;
  }
  /* light and dark */
  [part='circle-box'],
  [part='halo-box'] {
    display: block;
  }
  [part='circle'] {
    transition: d 600ms ease;
  }
  :host([icon='dark-to-light']) [part='circle-box'] {
    transform: matrix(1.5, 0, 0, 1.5, 7, 12);
  }
  :host([icon='dark-to-light']) [part='halo-box'] {
    transform: matrix(-1, 0, 0, -1, 12, 12);
  }
  :host([icon='light-to-dark']) [part='circle-box'] {
    transform: matrix(1, 0, 0, 1, 12, 12);
  }
  :host([icon='light-to-dark']) [part='halo-box'] {
    transform: matrix(1, 0, 0, 1, 12, 12);
  }
`

const attrs = {
  string: ['icon'],
}

export default class M3AnimatedIcon extends BaseElement {
  override render(): DocumentFragment {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" part="icon" viewBox="0 0 24 24">
        ${this.renderIcon()}
      </svg>
    `
  }
  renderIcon() {
    switch (this.icon) {
      case 'dark-to-light':
      case 'light-to-dark':
        return html`
          <g part="circle-box">
            <path
              part="circle"
              d="${this.renderTimes > 1
                ? this.dData[this.icon].from
                : this.dData[this.icon].to}"
            ></path>
          </g>
          <g part="halo-box">
            <path
              part="halo"
              d="M0,6 C-3.309999942779541,6 -6,3.309999942779541 -6,0 C-6,-3.309999942779541 -3.309999942779541,-6 0,-6 C3.309999942779541,-6 6,-3.309999942779541 6,0 C6,3.309999942779541 3.309999942779541,6 0,6z M8,-3.309999942779541 C8,-3.309999942779541 8,-8 8,-8 C8,-8 3.309999942779541,-8 3.309999942779541,-8 C3.309999942779541,-8 0,-11.3100004196167 0,-11.3100004196167 C0,-11.3100004196167 -3.309999942779541,-8 -3.309999942779541,-8 C-3.309999942779541,-8 -8,-8 -8,-8 C-8,-8 -8,-3.309999942779541 -8,-3.309999942779541 C-8,-3.309999942779541 -11.3100004196167,0 -11.3100004196167,0 C-11.3100004196167,0 -8,3.309999942779541 -8,3.309999942779541 C-8,3.309999942779541 -8,8 -8,8 C-8,8 -3.309999942779541,8 -3.309999942779541,8 C-3.309999942779541,8 0,11.3100004196167 0,11.3100004196167 C0,11.3100004196167 3.309999942779541,8 3.309999942779541,8 C3.309999942779541,8 8,8 8,8 C8,8 8,3.309999942779541 8,3.309999942779541 C8,3.309999942779541 11.3100004196167,0 11.3100004196167,0 C11.3100004196167,0 8,-3.309999942779541 8,-3.309999942779541z"
            ></path>
          </g>
        `

      default:
        return html``
    }
  }
  override styles() {
    return [...super.styles(), M3AnimatedIconStyles]
  }

  get dData() {
    return {
      'dark-to-light': {
        from: 'M0,-4 C-2.2100000381469727,-4 -4,-2.2100000381469727 -4,0 C-4,2.2100000381469727 -2.2100000381469727,4 0,4 C2.2100000381469727,4 4,2.2100000381469727 4,0 C4,-2.2100000381469727 2.2100000381469727,-4 0,-4z',
        to: 'M0,-4 C-2.2100000381469727,-4 -1.2920000553131104,-2.2100000381469727 -1.2920000553131104,0 C-1.2920000553131104,2.2100000381469727 -2.2100000381469727,4 0,4 C2.2100000381469727,4 4,2.2100000381469727 4,0 C4,-2.2100000381469727 2.2100000381469727,-4 0,-4z',
      },
      'light-to-dark': {
        from: 'M0,-4 C-2.2100000381469727,-4 -1.2920000553131104,-2.2100000381469727 -1.2920000553131104,0 C-1.2920000553131104,2.2100000381469727 -2.2100000381469727,4 0,4 C2.2100000381469727,4 4,2.2100000381469727 4,0 C4,-2.2100000381469727 2.2100000381469727,-4 0,-4z',
        to: 'M0,-4 C-2.2100000381469727,-4 -4,-2.2100000381469727 -4,0 C-4,2.2100000381469727 -2.2100000381469727,4 0,4 C2.2100000381469727,4 4,2.2100000381469727 4,0 C4,-2.2100000381469727 2.2100000381469727,-4 0,-4z',
      },
    }
  }

  lastAnimationType: string

  doAnimation() {
    switch (this.icon) {
      case 'light-to-dark':
      case 'dark-to-light':
        const circle = this.$('[part="circle"]') as SVGGElement
        const circleBox = this.$('[part="circle-box"]') as SVGGElement
        const haloBox = this.$('[part="halo-box"]') as SVGGElement
        const circleAniToDark: Keyframe[] = [
          { transform: 'matrix(1.5, 0, 0, 1.5, 7, 12)' },
          { transform: 'matrix(1, 0, 0, 1, 12, 12)' },
        ]
        const circleAniToLight: Keyframe[] = [
          { transform: 'matrix(1, 0, 0, 1, 12, 12)' },
          { transform: 'matrix(1.5, 0, 0, 1.5, 7, 12)' },
        ]
        const circleAniTiming: KeyframeAnimationOptions = {
          duration: 600,
          fill: 'forwards',
          easing: 'ease',
        }
        const haloAniToDark: Keyframe[] = [
          { transform: 'matrix(-1, 0, 0, -1, 12, 12)' },
          { transform: 'matrix(1, 0, 0, 1, 12, 12)' },
        ]
        const haloAniToLight: Keyframe[] = [
          { transform: 'matrix(1, 0, 0, 1, 12, 12)' },
          { transform: 'matrix(-1, 0, 0, -1, 12, 12)' },
        ]
        const haloAniTiming: KeyframeAnimationOptions = {
          duration: 800,
          fill: 'forwards',
          easing: 'cubic-bezier(.2,0,.3,1.3)',
        }
        setTimeout(() => {
          // @ts-ignore
          circle.setAttribute('d', this.dData[this.icon].to)
        }, 0)
        circleBox.animate(
          this.icon === 'light-to-dark' ? circleAniToDark : circleAniToLight,
          circleAniTiming
        )
        haloBox.animate(
          this.icon === 'light-to-dark' ? haloAniToDark : haloAniToLight,
          haloAniTiming
        )
        break

      default:
        break
    }
  }

  static get observedAttributes() {
    return [...attrs.string]
  }

  get icon() {
    return this.getAttribute('icon')
  }
  set icon(value: string) {
    this.setAttribute('icon', value)
  }

  override attributeChangedCallback(
    name: string,
    oldValue: string | undefined,
    newValue: string | undefined
  ) {
    super.attributeChangedCallback?.(name, oldValue, newValue)
    if (oldValue === newValue) return

    if (name === 'icon') {
      this._render()
      if (this.renderTimes > 2) this.doAnimation()
    }
  }
}

customElements.define('md-animated-icon', M3AnimatedIcon)
declare global {
  interface HTMLElementTagNameMap {
    'md-animated-icon': M3AnimatedIcon
  }
}
