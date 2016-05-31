const path = require('path')
const { pascal, kebab } = require('case')
const yeoman = require('yeoman-generator')
const { getConstants } = require('../../testHelper')

const componentNamePromptTemplate = `
Angular component’s name: "$ yo as:component button";
component will be initialized in created file app/components/button/index.js
`

module.exports = yeoman.Base.extend({
  constructor: function (...args) { // eslint-disable-line
    yeoman.Base.apply(this, args)
    this.argument('componentName', {
      type: String,
      desc: componentNamePromptTemplate,
    })
  },
  writing() {
    const constants = getConstants(this)
    const componentName = kebab(this.componentName)
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template // eslint-disable-line
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(path.join(`app/components/${componentName}/`, dest)),
        { componentName, pascal, kebab, constants }
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