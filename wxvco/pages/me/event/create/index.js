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
      {title: '地址', value:'', placeholder: '请在地图上标出位置'},],
    name: '',
    files: []
  },
  bindStartTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndSTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindDeadLineChange(e) {
    this.setData({
      deadLine: e.detail.value
    })
  },
  chooseAddress () {
    wx.chooseLocation().then((res) => {
        console.log(res)
        var _latitude = res.latitude
        var _longitude = res.longitude
        var _name = res.name
        var _address= res.address
        this.setData({
          latitude: _latitude,
          longitude: _longitude,
          name: _name,
          address: _address
        })
    }).catch((e) => {
        console.error(e)
    })
  },

  chooseImage (e) {
    console.log(e)
    var that = this
    wx.chooseImage().then((chooseData) => {
        var tempFilePaths = chooseData.tempFilePaths
        wx.uploadFile({
        url: 'https://testevent.ruanzhijun.cn/api/system/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file'
      }).then((uploadData) => {
        that.setData({
          files: that.data.files.concat(chooseData.tempFilePaths)
        });
        console.log(uploadData)
      }).catch((e) => {
        console.error(e)
      })
    })
  },
  previewImage(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  formSubmit (e) {
    console.log(e)
    if (e.detail.value.title.length == 0) {
      // this
    }
    this.props.event.publish(e.detail.value).then((res)=>{
      console.log(res)
    })
  },

  onLoad () {
    wx.setNavigationBarTitle({
      title: '发布活动'
    })
  }
}
page(o,{event:'event'})