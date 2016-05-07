const path = require('path')
const { camel, pascal } = require('case')
const yeoman = require('yeoman-generator')

const componentNamePromptTemplate = `
Angular component’s name: "$ yo as:component button";
component will be initialized in created file app/components/button/index.js
`

module.exports = yeoman.Base.extend({
  constructor: function (...args) { // eslint-disable-line
    yeoman.Base.apply(this, args)
    this.argument('componentName', {
      type: String,
      filter: camel,
      desc: componentNamePromptTemplate,
    })
  },
  writing() {
    const constants = (() => {
      try {
        return require(this.destinationPath('app/helpers/constants.json'))
      } catch (err) {
        return {}
      }
    })()
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template // eslint-disable-line
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(path.join(`app/components/${this.componentName}/`, dest)),
        { componentName: this.componentName, pascal, constants }
      )
    }
    const files = [
      'index.js',
      'template.jade',
      'style.sss',
    ]
    files.forEach(file => create(file))
  },
})
