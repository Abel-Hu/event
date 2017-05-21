/**
 * Created by ken on 2017/5/21.
 */
const {extendObservable} = require('./mobx')
module.exports = class {
  constructor() {
    (this.state && typeof this.state === 'function') && extendObservable(this, this.state())
  }
}
