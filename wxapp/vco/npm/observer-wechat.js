import {useStrict, autorun, observable, action} from './mobx'

const inject = function (stores) {
  return function (page) {
    return class extends page {
      constructor(...arg) {
        this.props = this.props || {}
        Object.keys(stores).map((key) => {
          if (!this.props[stores[key]]) {
            this.props[stores[key]] = require(`../store/${stores[key]}`).default
            //this.props[stores[key]] = new cls()
          }
        })
        super.constructor && super.constructor(...arg)
      }
    }
  }
}
const observer = function (page) {
  return class extends page {

    $update() {
      let props = this.props
      console.log(JSON.stringify(props))
      this.setData({props: toJS(props)});
    }

    onLoad(...arg) {
      this.props = mobx.observable(this.props);
      this.$autorun = autorun(() => {
        this.$update()
      })
      super.onLoad && super.onLoad(...arg)
    }

    onUnload(...arg) {
      this.$autorun()
      super.onUnload && super.onUnload(...arg)
    }
  }
}

module.exports = {
  observer,
  toJS,
  inject
}