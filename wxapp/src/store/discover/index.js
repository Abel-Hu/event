/**
 * Created by ken on 2017/5/19.
 */
import {autorun, observable, computed, action} from 'utils/mobx'
import aop from 'aop'
export default function(){
  return class extends aop {
    @observable code = ''
    constructor() {
      autorun(()=>{
        console.log('discover store',this.code)
      })
    }
    @action setCode(c){
      this.code = c
    }

    @action delayCode(){
      setInterval(()=>{
        this.code++
      },500)
    }
  }
}