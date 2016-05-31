import { routes } from '../helpers/'
import requireAll from '../helpers/requireAll'

const states = requireAll(require.context('./', true, /\/index\.js$/))

export default routes(
['$stateProvider', '$urlRouterProvider', '$locationProvider',
($stateProvider, $urlRouterProvider, $locationProvider) => {
  // Note that removing the requirement for a <base> tag will have adverse
  // side effects when resolving relative paths with $location in IE9.
  // see https://docs.angularjs.org/error/$location/nobase
  $locationProvider.html5Mode({ enabled: true, requireBase: false })
  $urlRouterProvider.otherwise('/')

  states.forEach(state => {
    $stateProvider
      .state(state.name, state.config)
  })
}])
