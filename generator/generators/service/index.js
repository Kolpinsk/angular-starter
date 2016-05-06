const { pascal } = require('case')
const yeoman = require('yeoman-generator')
require('colors')

const serviceNamePromptTemplate = `
Angular service’s name: "$ yo as:service api";
service will be initialized in created file app/services/api.js
`

module.exports = yeoman.Base.extend({
  constructor: function (...args) { // eslint-disable-line
    yeoman.Base.apply(this, args)
    this.argument('serviceName', {
      type: String,
      filter: pascal,
      desc: serviceNamePromptTemplate,
    })
  },
  writing() {
    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(`app/service/${this.serviceName}.js`),
      { serviceName: this.serviceName }
    )
  },
})
