/**
 * Created by ken on 2017/6/4.
 */
/**
 * Created by ken on 2017/6/4.
 */
const {Store, http} = wx.vco
const Api = {
  userlist: '/api/manage/userlist',
  update: '/api/manage/userupdate',
  eventlist: '/api/manage/eventlist',
  eventupdate: '/api/manage/eventupdate'
}
module.exports = class extends Store {
  state () {
    return {
      userlist: {
        data: [],
        headSequence: '',
        lastSequence: '',
        pageSize: 10,
        nickName: '',
        order: 'uid',// 可排序属性(可选：uid-注册时间；eventPublishs-发布活动数；eventJoins-参与活动数)，默认注册时间
        by: 'desc'//  排序方式(可选：asc-顺序；desc-倒序)，默认倒序
      },
      eventlist: {
        data: [],
        headSequence: '',
        lastSequence: '',
        pageSize: 10,
        title: '',
        order: 'uid',// 可排序属性(可选：uid-注册时间；eventPublishs-发布活动数；eventJoins-参与活动数)，默认注册时间
        by: 'desc'//  排序方式(可选：asc-顺序；desc-倒序)，默认倒序
      }
    }
  }

  /**
   * 获取所有用户列表
   * @param params nickName,order,by
   * @param reload 是否下拉刷新
   * @param cb
   */
  getUserlist (params = {}, reload = false, cb) {
    this.$list(Api.userlist, this.userlist, reload, cb, 'get', params)
  }

  /**
   参数  是否必要  类型  说明
   uid  是  string  用户id
   isVip  否  boolean  是否为大V用户
   * @param post
   * @param cb
   * @param catchFn 非 code=1的操作
   */
  update (post, cb, catchFn) {
    http.post(Api.update, post, catchFn).then(d => {
      cb && cb()
    })
  }

  /**
   * 获取所有活动列表
   * @param params title,order,by
   * @param reload 是否下拉刷新
   * @param cb
   */
  getEventlist (params = {}, reload = false, cb) {
    this.$list(Api.eventlist, this.eventlist, reload, cb, 'get', params)
  }

  /**
   参数  是否必要  类型  说明
   uid  是  string  用户id
   isVip  否  boolean  是否为大V用户
   * @param post
   * @param cb
   * @param catchFn 非code = 1 的操作
   */
  eventUpdate (post, cb, catchFn) {
    http.post(Api.eventupdate, post, catchFn).then(d => {
      cb && cb()
    })
  }
}
