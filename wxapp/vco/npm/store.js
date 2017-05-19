/**
 * Created by ken on 2017/5/19.
 */
import {useStrict, autorun, observable, action} from './mobx'
/**
 * 启动严格模式
 */
useStrict(true)
const _StoreObjectCache = {}
const observer = function (page) {
  /**
   * 绑定mobx 与 page
   */
  let connected = observable(false)

  return class extends page {
    storeUnRegister = false
    appStore = {
      store: {},
      register: function (o) {
        Object.keys(o).map((keys) => {
          let pathVal = o[keys]
          if (!_StoreObjectCache[pathVal]) {
            let Cls = require(`../store/${pathVal}`).default
            console.log(Cls)
            Cls = Cls()
            _StoreObjectCache[pathVal] = new Cls()
          }
          this.store[pathVal] = _StoreObjectCache[pathVal]
          console.log(`this.store[pathVal]`,this.store[pathVal])
        })
      }
    }
    constructor(...arg) {
      super.constructor && super.constructor(...arg)
      //init data
      let state = (typeof this.state === 'function') && this.state() || {}
      this.data = {...state}
    }

    onShow(...arg) {
      console.log('onShow')
      action(() => {
        connected.set(true)
      })()
      super.onShow && super.onShow(...arg)
    }

    onHide(...arg) {
      console.log('onHide')
      action(() => {
        connected.set(false)
      })()
      super.onHide && super.onHide(...arg)
    }

    onLoad(...arg) {
      console.log('onLoad')
      autorun(() => {
        console.log('autorun storeApp', this.storeApp, 'storeRegister', this.storeUnRegister, `connected.get()`, connected.get())
        console.log('onload', !this.storeUnRegister && connected.get() && typeof this.state === 'function')
        if (!this.storeUnRegister && connected.get() && typeof this.state === 'function') {
          let state = this.state()
          console.log('state', state)
          this.setData({...state})
        }
      })
      super.onLoad && super.onLoad(...arg)
    }

    onUnload(...arg) {
      console.log('onUnload')
      action(() => {
        this.storeUnRegister = true
        connected.set(false)
        console.log('this.storeUnRegister', this.storeUnRegister)
      })()
      super.onUnload && super.onUnload(...arg)
    }
  }
}
export {
  observer
}