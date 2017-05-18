/**
 * Created by ken on 2017/1/5.
 */
import {Promise} from 'promise'
const host = 'https://gouwei.wvovo.com'
const WxHttp = function (method = 'GET') {
  /**
   * @url
   * @data
   * @header:{'content-type': 'application/x-www-form-urlencoded'||'application/json'}
   * token
   */
  return function (url = '', data = {}, header = {}, token = '') {
    url = (url.indexOf('http') > -1) ? url : `${host}${url}`
    const {member} = getApp()
    if (token === '') {
      token = (member && member.token) ? member.token : ''
    }
    header = header || {'content-type': 'application/x-www-form-urlencoded'}
    if (token) {
      header.token = token
    }
    return new Promise((resolve, reject) => {
      wx.request({
        method: method,
        url: url,
        data: data,
        header: header,
        complete: (res) => {
          const {object,code,message} = res.data
          resolve({object, code, message})
          //reject(object,code,message)
        }
      })
    })
  }
}

export default {
  get: WxHttp('GET'),
  post: WxHttp('POST'),
  put: WxHttp('PUT'),
  del: WxHttp('DELETE')
}
