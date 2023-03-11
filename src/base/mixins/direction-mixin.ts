import { Constructor } from '../../utils/types.js'
import BaseElement from '../base/element.js'

/**
 * @module DirectionMixin
 */
export default function DirectionMixin(Base: Constructor<BaseElement>) {
  return class Direction extends Base {
    rightToLeft: boolean = false

    override connectedCallback(): void {
      const element: any = this
      const languageDirection = getComputedStyle(element).direction
      const rightToLeft = languageDirection === 'rtl'
      this.rightToLeft = rightToLeft

      super.connectedCallback()
    }
  }
}
