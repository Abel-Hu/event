/**
 * Created by ken on 2017/5/19.
 */
import {autorun, observable, computed, action} from 'utils/mobx'
import http from 'utils/http'
import aop from 'store/aop'
const LoginTimeOut = 604700 //  登陆过期时间 秒为单位 默认为 7天 ：604700
const MzMemberKey = 'member' // 登陆缓存key
const Api = {
  login:'xxx/login'
}
export default class extends aop {

  @observable member = {}
  @action
  async getMember() {
    let member = await wx.getStorage({key: MzMemberKey})
    member = member && member.data || {}

    /**
     * 7天时间 7天后退出登陆过
     * @type {number}
     */
    if (Object.keys(member).length > 0) {
      member.now = member.now || 0
      let nowTimeOut = Date.now() / 1000 - member.now
      if (nowTimeOut > LoginTimeOut) {
        await wx.removeStorage({key: MzMemberKey})
        member = {}
      }
    }
    /**
     * 7天后注销重新登录
     */

    if (Object.keys(member).length === 0) {
      let {code} = await wx.login()
      member = await wx.getUserInfo()
      member.code = code
      /*let {object, code, message} = await http.post(Api.login, member)

      if (code === 1) {
        member = Object.assign(member, object)
      }
      await wx.setStorage({key: MzMemberKey, data: member}) // 微信异步set*/
    }
    this.member = member
    //
    getApp().member = member// 约定token
    return this.member
  }
}