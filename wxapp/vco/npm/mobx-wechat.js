import {useStrict, autorun, observable, action, spy} from './mobx'
import {toJS} from './tojs'
/**
 * 启动严格模式
 */
useStrict(false)
/**
 * 注入Store
 * @param StoreClass
 * @returns {Function}
 */
export const inject = function (stores) {
  return function (page) {
    return class extends page {
      constructor(...args) {
        super(...args)
        this.store = {}
        Object.keys(stores).map((key) => {
          let path = stores[key]
          let Cls = require(`../store/${path}`)
          this.store[path] = new Cls.default()
        })
        super.constructor()
      }
    }
  }
}
/**
 * 监听 pageClass
 * @param page
 * @returns {{}}
 */
export const observer = function (page) {

  return class extends page {
    /**
     * 监听观察者变化 同步到 setData
     * 私有变量
     * 单向绑定 state
     * 双向绑定store 没有定义state的话采取 store绑定数据 懒人模式
     */
    $update() {
      var props = this.store || {}
      this.setData({props: toJS(props)})
    }


    onLoad(...arg) {
      this.store = observable(this.store)
      console.log('onLoad', JSON.stringify(this.store))
      this.$unload = autorun(() => {
        console.log('this.store', JSON.stringify(this.store))
        this.$update()
      })
      super.onLoad && super.onLoad(...arg)
    }

    onShow(...arg) {
      console.log('onShow')
      super.onShow && super.onShow(...arg)
    }

    onHide(...arg) {
      console.log('onHide')
      super.onHide && super.onHide(...arg)
    }

    onUnload(...arg) {
      this.$unload()
      super.onUnload && super.onUnload(...arg)
    }
  }
}


