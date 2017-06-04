// index.js
const {page,http} = wx.vco
const o = {
  /**
   * 页面的初始数据
   */
  data: {
    item: [{title: '活动标题', value: '', placeholder: '请输入活动标题'},
      {title: '活动图片', value: '', placeholder: '请上传活动图片'},
      {title: '活动描述', value: '', placeholder: '请输入活动描述'},
      {title: '开始时间', value: '', placeholder: '请输入开始时间'},
      {title: '报名截止时间', value: '', placeholder: '请输入报名截止时间'},
      {title: '最大参与人数', value: '', placeholder: '请输入最大参与人数'},
      {title: '地址', value: '', placeholder: '请在地图上标出位置'},],
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
      deadline: e.detail.value
    })
  },
  chooseAddress () {
    wx.chooseLocation().then((res) => {
      console.log(res)
      var _latitude = res.latitude
      var _longitude = res.longitude
      var _name = res.name
      var _address = res.address
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
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    }).then((chooseData) => {
      var tempFilePaths = chooseData.tempFilePaths

      http.upload(tempFilePaths[0]).then((uploadData) => {
        that.setData({
          files: that.data.files.concat(uploadData)
        })
        console.log('图片上传成功',uploadData)
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
    if (e.detail.value.title.length == 0) {
      // this
    }
    var parameters = e.detail.value
    parameters.startTime = this.data.startTime
    parameters.endTime = this.data.endTime
    parameters.deadline = this.data.deadline
    parameters.latitude = this.data.latitude
    parameters.longitude = this.data.longitude
    parameters.address = this.data.address
    parameters.images = this.data.files

    console.log(1111,parameters)

    this.props.event.publish(parameters).then((res) => {
      console.log(res)
    })
  },

  onLoad () {
    wx.setNavigationBarTitle({
      title: '发布活动'
    })
  }
}
page(o, {event: 'event'})