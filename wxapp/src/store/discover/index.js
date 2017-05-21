/**
 * Created by ken on 2017/5/19.
 */
import {autorun, observable, computed, action} from 'utils/mobx'
import aop from 'aop'
export default class extends aop {
  @observable code = 0
  sn = 'discover index'
  constructor() {
    console.log('discover',this)
    autorun(() => {
      console.log('discover store', this.code)
    })
  }

  @action setCode(c) {
    this.code = c
  }

  @action delayCode() {
    this.t = setInterval(() => {
      this.code++
    }, 500)
  }
  @action cleanCode(){
    clearInterval(this.t)
  }
}
