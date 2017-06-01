// index.js
const {page} = wx.vco
const o =  {
  /**
   * 页面的初始数据
   */
  data: {
    item: [{title: '活动标题', value:'', placeholder: '请输入活动标题'},
      {title: '活动图片', value:'', placeholder: '请上传活动图片'},
      {title: '活动描述', value:'', placeholder: '请输入活动描述'},
      {title: '开始时间', value:'', placeholder: '请输入开始时间'},
      {title: '报名截止时间', value:'', placeholder: '请输入报名截止时间'},
      {title: '最大参与人数', value:'', placeholder: '请输入最大参与人数'},
      {title: '地址', value:'', placeholder: '请在地图上标出位置'},]
  },

  onLoad () {
    wx.setNavigationBarTitle({
      title: '发布活动'
    })
  }
}
page(o)