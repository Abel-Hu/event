/**
 * Created by ken on 2017/6/4.
 */
/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = {

  onLoad () {
    wx.setNavigationBarTitle({
      title: '活动详情'
    })
    this.props.event.getList(false, () => {

    })
  }
}
page(o, {member: 'wechat/member', event: 'event'})