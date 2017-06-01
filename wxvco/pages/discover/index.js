/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = {

  onLoad () {
    this.props.member.getMember()
  }
}
Page(page(o, {todo: 'todo', member: 'wechat/member'}))