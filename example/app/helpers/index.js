import angular from 'angular'
import { pascal, camel } from 'case'
import { endWith } from './string'
import { PREFIX, APP_NAME } from './constants'

const createModule = ({ prefix = '', nameValidation = () => true } = {}) => moduleName =>
  (name, dependencies, moduleOptions) => {
    nameValidation(name)
    const modifiedName = prefix ? prefix + pascal(name) : name
    return angular
      .module(`${APP_NAME}.${moduleName}.${camel(name)}`, dependencies)
      [moduleName](modifiedName, moduleOptions)
      .name
  }

const createModuleWithPrefix = createModule({ prefix: PREFIX })
const createDefaultModule = createModule()

export const component = createModuleWithPrefix('component')
export const directive = createModuleWithPrefix('directive')
export const filter = createModuleWithPrefix('filter')


// services

const validateServiceName = name => {
  if (!endWith(name, 'Service')) {
    throw new Error('Service name should has Service postfix')
  }

  if (pascal(name) !== name) {
    throw new Error('Service name should be in PascalCase')
  }
}

const createServiceWithValidation = createModule({ nameValidation: validateServiceName })

export const constant = createDefaultModule('constant')
export const value = createDefaultModule('value')

export const factory = createServiceWithValidation('factory')
export const service = createServiceWithValidation('service')


// routes

export const routes = config =>
  angular
    .module(`${APP_NAME}.routes`, [require('angular-ui-router')])
    .config(config)
    .name

export const route = (name, config) => ({ name, config })
