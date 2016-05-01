import component from '../../helpers/component'
import template from './template.jade'
import './style.sss'


export default component('button', [], {
  bindings: {
    color: '<',
  },
  controller: [function ButtonController() {
  }],
  transclude: true,
  replace: true,
  template,
})
