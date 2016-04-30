import angular from 'angular'


// require all components
const req = require.context('./components', true, /\/index\.js$/i)
const modules = req.keys().map(p => req(p).default)

angular.module('example', modules).run()
