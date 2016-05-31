import { directive } from '../helpers'

export default directive('<%= directiveName %>', [], () => ({
  link() {
    console.log('<%= directiveName %>')
  },
}))
