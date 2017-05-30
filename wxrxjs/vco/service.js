/**
 * Created by ken on 2017/5/29.
 */
module.exports = class {
  constructor () {
    if (this.state && typeof this.state === 'function') {
      const state = this.state()
      Object.keys(state).map((key) => {
        this[key] = state[key]
      })
    }
  }
}
