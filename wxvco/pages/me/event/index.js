const {page} = wx.vco
const o = class {
  onLoad () {
    wx.setNavigationBarTitle({
      title: '活动列表'
    })
  }
}
page(o)
