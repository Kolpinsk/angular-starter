import { filter } from '../helpers'

export default filter('<%= filterName %>', [], () => {
  return () => {
    return <%= filterName %>
  }
})
