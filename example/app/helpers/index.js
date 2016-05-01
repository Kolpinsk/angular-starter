import angular from 'angular'
import { pascal, camel } from 'case'
import { endWith } from './string'
import { PREFIX, APP_NAME } from './constants'

const createModule = (moduleName, { withPrefix = true } = {}) =>
(name, dependencies, moduleOptions) => (
  angular
    .module(`${APP_NAME}.${moduleName}.${camel(name)}`, dependencies)
    [moduleName](`${withPrefix ? PREFIX : ''}${pascal(name)}`, moduleOptions)
    .name
)

export const component = createModule('component')
export const directive = createModule('directive')
export const filter = createModule('filter')


// services

const withoutPrefix = { withPrefix: false }

const validateServiceName = name => {
  if (!endWith(name, 'Service')) {
    throw new Error('Service name should has Service postfix')
  }

  if (pascal(name) !== name) {
    throw new Error('Service name should be in PascalCase')
  }
}

const createServiceWithValidation = moduleName => (name, ...args) => {
  validateServiceName(name)
  return createModule(moduleName, withoutPrefix)(name, ...args)
}

export const constant = createModule('constant', withoutPrefix)
export const value = createModule('value', withoutPrefix)

export const factory = createServiceWithValidation('factory')
export const service = createServiceWithValidation('service')
