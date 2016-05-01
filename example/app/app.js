import angular from 'angular'
import { APP_NAME } from './helpers/constants'


const requireAll = req => (
  req.keys().map(p => req(p).default)
)

// require all components
const components = requireAll(
  require.context('./components', true, /\/index\.js$/)
)

// require directives
const directives = requireAll(
  require.context('./directives', true, /\.js$/)
)

// require filters
const filters = requireAll(
  require.context('./filters', true, /\.js$/)
)

// require services
const services = requireAll(
  require.context('./services', true, /\.js$/)
)

const dependencies = [
  ...components,
  ...directives,
  ...filters,
  ...services,
  // filter undefined which appear if no file in directory
].filter(m => m)

console.log(dependencies)

angular.module(APP_NAME, dependencies).run()
