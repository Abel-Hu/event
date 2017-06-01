/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = {
  onShow () {
    this.props.todo.utxt()
  },

  onHide () {
    this.props.todo.ut()
  },

  uploadAvatar (e) {
    console.log(e)
    wx.chooseImage().then((chooseData) => {
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
    })
  },

  onLoad () {
    wx.setNavigationBarTitle({
      title: '我'
    })
    this.props.member.getMember()
  }
}
page(o, {todo: 'todo', member: 'wechat/member'})