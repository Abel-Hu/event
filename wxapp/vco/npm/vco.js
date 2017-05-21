/**
 * Created by ken on 2017/1/10.
 */
import app from './app'
import page from './page'
//import {observer} from './store'
import {observer,inject} from './mobx-wechat'
export default {
  /**
   * 初始化app 实例化所有变量
   * @param AppClass
   */
  $initApp(AppClass) {
    let Cls = new AppClass()
    return Cls.$init()
  },
  /**
   * 初始化 page 实例化所有变量
   * @param PageClass
   */
  $initPage(PageClass) {
    let Cls = new PageClass()
    return Cls.$init()
  }
}

export {
  page,
  app,
  observer,
  inject
}
