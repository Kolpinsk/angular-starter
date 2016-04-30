import component from '../../helpers/component'
import template from './template.jade'


export default component('button', [], {
  bindings: {
    color: '<',
  },
  controller: [function ButtonController() {
    console.log('button controller')
  }],
  transclude: true,
  replace: true,
  template,
})
