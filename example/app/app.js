import './main.sss'
import template from './template.jade'

console.log({ template })

const $ = selector => document.querySelector(selector)

$('#root').innerHTML = template
