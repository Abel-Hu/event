/**
 * Created by ken on 2017/5/31.
 */
const {page} = wx.vco
const o = class {

  onLoad () {
    this.props.member.getMember()
  }
}
page(o, {todo: 'todo', member: 'wechat/member'})