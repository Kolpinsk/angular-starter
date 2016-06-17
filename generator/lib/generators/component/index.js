const path = require('path')
const Case = require('case')
const yeoman = require('yeoman-generator')
const h = require('../../helper')

const componentNamePromptTemplate = `
Angular component’s name: "$ yo as:component button";
component will be initialized in created file app/components/button/index.js
`

module.exports = yeoman.Base.extend({
  constructor: function () { // eslint-disable-line
    yeoman.Base.apply(this, arguments)
    this.argument('componentName', {
      type: String,
      desc: componentNamePromptTemplate,
    })
  },
  writing() {
    const constants = h.getConstants(this)
    const componentName = Case.kebab(this.componentName)
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template // eslint-disable-line
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(path.join(`app/components/${componentName}/`, dest)),
        { componentName, Case, constants }
      )
    }
    const files = [
      'index.js',
      'README.md',
      'template.jade',
      'style.sss',
    ]
    files.forEach(file => create(file))
  },
})
