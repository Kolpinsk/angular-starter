const Case = require('case')
const yeoman = require('yeoman-generator')
require('colors')

const filterNamePromptTemplate = `
Angular filter’s name: "$ yo as:filter autofocus";
filter will be initialized in created file app/filters/autofocus.js
`

module.exports = yeoman.Base.extend({
  constructor: function () { // eslint-disable-line
    yeoman.Base.apply(this, arguments)
    this.argument('filterName', {
      type: String,
      desc: filterNamePromptTemplate,
    })
  },
  writing() {
    const filterName = Case.kebab(this.filterName)
    this.fs.copyTpl(
      this.templatePath('filter.js'),
      this.destinationPath(`app/filters/${filterName}.js`),
      { filterName }
    )
  },
})
