/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = {


  uploadAvatar (e) {
    console.log(e)
    /*wx.chooseImage().then((chooseData) => {
      var tempFilePaths = chooseData.tempFilePaths
      wx.uploadFile({
        url: 'https://testevent.ruanzhijun.cn/api/system/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file'
      }).then((uploadData) => {
        console.log(uploadData)
      }).catch((e) => {
        console.error(e)
      })
    })*/
  },

  onLoad () {
    wx.setNavigationBarTitle({
      title: '我'
    })
  }
}
page(o, { member: 'wechat/member'})