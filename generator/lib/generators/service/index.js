const Case = require('case')
const yeoman = require('yeoman-generator')
require('colors')

const serviceNamePromptTemplate = `
Angular service’s name: "$ yo as:service api";
service will be initialized in created file app/services/api.js
`

module.exports = yeoman.Base.extend({
  constructor: function () { // eslint-disable-line
    yeoman.Base.apply(this, arguments)
    this.argument('serviceName', {
      type: String,
      desc: serviceNamePromptTemplate,
    })
  },
  writing() {
    const serviceName = Case.pascal(this.serviceName)
    this.fs.copyTpl(
      this.templatePath('service.js'),
      this.destinationPath(`app/services/${serviceName}.js`),
      { serviceName }
    )
  },
})
