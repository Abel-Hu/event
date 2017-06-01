/**
 * Created by ken on 2017/1/5.
 */
const host = 'https://testevent.ruanzhijun.cn'
// const host = 'https://event.ruanzhijun.cn'
const WxHttp = function (method = 'GET') {
  /**
   * @url 链接地址
   * @data 传输数据
   * @catchErrorCode 错误自定义
   * @header:{'content-type': 'application/x-www-form-urlencoded'||'application/json'}
   * @token=String
   */
  return function (url = '', data = {}, catchErrorCode, header, token = false) {
    url = (url.indexOf('http') > -1) ? url : `${host}${url}`

    token = token || wx.vco.data.token
    header = header || {'content-type': 'application/json'}
    if (token) {
      header.token = token
    }
    return new Promise((resolve, reject) => {
      wx.request({
        method: method,
        url: url,
        data: data,
        header: header,
        complete(res) {
          let {data, code, message} = res.data
          message = message || ''
          if (code === 1) {
            return resolve(data)
          }
          if (catchErrorCode && typeof catchErrorCode === 'function') {
            catchErrorCode({data, code, message})
          } else {
            let msg = ''
            if (typeof message === 'object') {
              Object.keys(message).map(k => {
                msg += `${message[k]}\n`
              })
            } else {
              msg = message
            }
            wx.showToast({
              title: msg,
              icon: 'loading',
              duration: 1500
            })
          }
          return reject(res.data)
        },
        error(e) {
          reject(e)
        }
      })
    })
  }
}

module.exports = {
  get: WxHttp('GET'),
  post: WxHttp('POST'),
  put: WxHttp('PUT'),
  del: WxHttp('DELETE')
}
