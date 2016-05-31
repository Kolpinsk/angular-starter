import { route } from '../../helpers/'
import template from './template.jade'
import './style.sss'

export default route('index', {
  url: '/',
  template,
  controller: [function IndexController() {
    console.log('index page')
  }],
})
