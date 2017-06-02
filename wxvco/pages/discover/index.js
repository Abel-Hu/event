/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o =  {

  onLoad () {
    wx.setNavigationBarTitle({
      title: '发现'
    })
    this.props.event.getList()
  }
}
page(o, {member: 'wechat/member',event:'event'})