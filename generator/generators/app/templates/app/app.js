import angular from 'angular'
import { APP_NAME } from './helpers/constants'
import requireAll from './helpers/requireAll'


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
  <% if (withRouting) { %>require('./pages/routes').default,
  <% } %>// filter undefined which appear if no file in directory
].filter(Boolean)


angular.module(APP_NAME, dependencies).run()
