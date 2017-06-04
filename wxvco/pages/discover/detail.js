/**
 * Created by ken on 2017/6/4.
 */
/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = {

  onLoad (opt) {
    wx.setNavigationBarTitle({title: '活动详情'})
    const {eventId} = opt
    this.props.event.info(eventId,() => {

    })
  }
}
page(o, {member: 'wechat/member', event: 'event'})