/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o =  {

  onLoad () {
    wx.setNavigationBarTitle({
      title: '发现'
    })
  }
}
page(o, {todo: 'todo', member: 'wechat/member'})