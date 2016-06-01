// Disable quote-props to have one style in all config
/* eslint quote-props: "off" */

const err = 'error'
const warn = 'warn'
const off = 'off'

module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-multiple-empty-lines': [warn, { max: 5 }],
    'no-param-reassign': [err, { props: false }],
    'id-length': [err, { min: 1, max: 40 }],
    'arrow-parens': [warn, 'as-needed'],
    'arrow-body-style': off,
    'semi': [err, 'never'],
    'global-require': off,
    'no-console': off,
    'func-names': off,
  },
}
