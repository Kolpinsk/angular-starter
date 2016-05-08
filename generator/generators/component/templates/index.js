import { component } from '../../helpers'
import template from './template.jade'
import './style.sss'

export default component('<%= componentName %>', [/* dependencies */], {
  bindings: {
    // attributes
    // oneWayBinding: '<',
    // twoWayBindingOptional: '=?',
  },
  controller: [function <%= pascal(componentName) %>Controller() {
    // write your controller here
    // assign properties to this
    // and use it inside template as $ctrl.propertyName
  }],
  template,
})
