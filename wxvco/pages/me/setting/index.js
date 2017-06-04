// index.js
const {page} = wx.vco
const o =  {
  onLoad () {
    wx.setNavigationBarTitle({
      title: '个人设置'
    })
    this.props.user.getUserInfo(null, () => {
    })
  },

  bindDateChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  sexChange: function(e) {
    console.log('sex发生change事件，携带value值为：', e.detail.value)
  }

}
page(o, {user: 'user'})
