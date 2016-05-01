import angular from 'angular'


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

const dependencies = [
  ...components,
  ...directives,
  // filter undefined which appear if no file in directory
].filter(m => m)

console.log(dependencies) // eslint-disable-line

angular.module('example', dependencies).run()
