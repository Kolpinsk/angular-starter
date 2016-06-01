import { route } from '../../helpers/'
import template from './template.jade'
import './style.sss'

export default route('<%= pageName %>', {
  url: '/',
  template,
  controller: [function <%= Case.pascal(pageName) %>Controller() {
    console.log('<%= pageName %> page')
  }],
})
