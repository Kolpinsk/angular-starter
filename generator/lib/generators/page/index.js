const path = require('path')
const Case = require('case')
const yeoman = require('yeoman-generator')
const h = require('../../helper')

const pageNamePromptTemplate = `
Angular page’s name: "$ yo as:page index";
page will be initialized in created file app/pages/index/index.js
`

module.exports = yeoman.Base.extend({
  constructor: function () { // eslint-disable-line
    yeoman.Base.apply(this, arguments)
    this.argument('pageName', {
      type: String,
      desc: pageNamePromptTemplate,
    })
  },
  writing() {
    const pageName = Case.camel(this.pageName)
    const constants = h.getConstants(this)
    const create = (template, dest) => {
      if (dest === undefined) {
        dest = template // eslint-disable-line
      }
      this.fs.copyTpl(
        this.templatePath(template),
        this.destinationPath(path.join(`app/pages/${pageName}/`, dest)),
        { pageName, Case, constants }
      )
    }
    const files = [
      'index.js',
      'template.jade',
      'style.sss',
    ]
    files.forEach(file => create(file))
    h.eslintCheck(this, files)
  },
})
