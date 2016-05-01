import { filter } from '../helpers'

export default filter('phoneHref', [], () => phone =>
  `tel:${phone.replace(/[^\d\+]/g, '')}`
)
