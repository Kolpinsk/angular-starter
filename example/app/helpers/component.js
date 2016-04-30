import angular from 'angular'
import { pascal, kebab } from 'case'

const component = (name, dependencies, componentOptions) => (
  angular
    .module(`example.${kebab(name)}`, dependencies)
    .component(`e${pascal(name)}`, componentOptions)
    .name
)

export default component
