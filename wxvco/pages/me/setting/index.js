// index.js
const {page} = wx.vco
const o =  {
  onLoad () {
    wx.setNavigationBarTitle({
      title: '个人设置'
    })
  },

  bindDateChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }

}
page(o)
