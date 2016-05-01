import angular from 'angular'


// require all components
const req = require.context('./components', true, /\/index\.js$/i)
const components = req.keys().map(p => req(p).default)

angular.module('example', components).run()
