import { directive } from '../helpers'

export default directive('logSomething', [], () => ({
  link() {
    console.log('something') // eslint-disable-line
  },
}))
