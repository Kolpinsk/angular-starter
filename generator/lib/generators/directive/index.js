const Case = require('case')
const yeoman = require('yeoman-generator')
require('colors')

const directiveNamePromptTemplate = `
Angular directive’s name: "$ yo as:directive autofocus";
directive will be initialized in created file app/directives/autofocus.js
`

module.exports = yeoman.Base.extend({
  constructor: function (...args) { // eslint-disable-line
    yeoman.Base.apply(this, args)
    this.argument('directiveName', {
      type: String,
      desc: directiveNamePromptTemplate,
    })
  },
  writing() {
    const directiveName = Case.kebab(this.directiveName)
    this.fs.copyTpl(
      this.templatePath('directive.js'),
      this.destinationPath(`app/directives/${directiveName}.js`),
      { directiveName }
    )
  },
})
