/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o =  {
  onShow () {
    this.props.todo.utxt()
  },

  onHide () {
    this.props.todo.ut()
  },

  handleClick (e) {
    console.log(e)
  },

  onLoad () {
    wx.setNavigationBarTitle({
      title: '我'
    })
    this.props.member.getMember()
    /*    wx.chooseImage({
     fail: function(res) {
     console.log(res);
     },
     complete: function(res) {
     console.log(res);
     },
     success: function(res) {
     console.log(res);
     // var tempFilePaths = res.tempFilePaths
     // wx.uploadFile({
     //   url: 'https://testevent.ruanzhijun.cn/api/system/upload', //仅为示例，非真实的接口地址
     //   filePath: tempFilePaths[0],
     //   name: 'file',
     //   success: function(res){
     //     var data = res.data
     //     console.log(data);
     //     //do something
     //   }
     // })
     }
     })*/
  }
}
page(o, {todo: 'todo', member: 'wechat/member'})