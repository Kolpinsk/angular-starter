import angular from 'angular'
import { pascal, camel } from 'case'
import { endWith } from './string'
import { PREFIX, APP_NAME } from './constants'

const angularModule = (moduleName, { withPrefix = true } = {}) =>
(name, dependencies, moduleOptions) => (
  angular
    .module(`${APP_NAME}.${moduleName}.${camel(name)}`, dependencies)
    [moduleName](`${withPrefix ? PREFIX : ''}${pascal(name)}`, moduleOptions)
    .name
)

export const component = angularModule('component')
export const directive = angularModule('directive')
export const filter = angularModule('filter')

export const factory = (name, ...args) => {
  if (!endWith(name, 'Service')) {
    throw new Error('Service name should has Service postfix')
  }

  if (pascal(name) !== name) {
    throw new Error('Service name should be in PascalCase')
  }

  return angularModule('factory', { withPrefix: false })(name, ...args)
}
