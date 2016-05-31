import { component } from '../../helpers'
import template from './template.jade'
import './style.sss'


export default component('button', [], {
  bindings: {
    color: '<',
  },
  controller: ['TestService', function ButtonController(TestService) {
    console.log(TestService)
  }],
  transclude: true,
  replace: true,
  template,
})
