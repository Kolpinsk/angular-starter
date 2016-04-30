const err = 'error'
const warn = 'warn'
const off = 'off'

module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    semi: [err, 'never'],
    'arrow-parens': [warn, 'as-needed'],
    'id-length': [err, { min: 1, max: 40 }],
    'no-multiple-empty-lines': [warn, { max: 5 }],
    'arrow-body-style': off,
  },
}
