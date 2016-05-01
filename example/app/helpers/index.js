import angular from 'angular'
import { pascal, camel } from 'case'
import { endWith } from './string'
import { PREFIX, APP_NAME } from './constants'

const angularModule = moduleName => (name, dependencies, moduleOptions) => (
  angular
    .module(`${APP_NAME}.${moduleName}.${camel(name)}`, dependencies)
    [moduleName](`${PREFIX}${pascal(name)}`, moduleOptions)
    .name
)

export const component = angularModule('component')
export const directive = angularModule('directive')
export const filter = angularModule('filter')

export const factory = (name, dependencies, func) => {
  if (!endWith(name, 'Service')) {
    throw new Error('Service name should has Service postfix')
  }

  if (pascal(name) !== name) {
    throw new Error('Service name should be in PascalCase')
  }

  const plainName = name.slice(0, -'Service'.length) // remove Service postfix
  return angular
    .module(`${APP_NAME}.service.${camel(plainName)}`, dependencies)
    .factory(name, func)
    .name
}
