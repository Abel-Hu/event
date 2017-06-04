/**
 * Created by ken on 2017/5/31.
 */
const {Store, http, helper} = wx.vco
const Api = {
  publish: '/api/event/publish',
  update: '/api/event/update',
  info: '/api/event/info',
  list: '/api/event/list',
  fav: '/api/event/fav',
  unfav: '/api/event/unfav',
  join: '/api/event/join',
  commentadd: '/api/event/commentadd',
  commentdel: '/api/event/commentdel',
  commentlist: '/api/event/commentlist',
  joinlist: '/api/event/joinlist',
  share: '/api/event/share'
}
module.exports = class extends Store {
  state () {
    return {
      list: {
        data: [],
        headSequence: '',
        lastSequence: '',
        pageSize: 10
      },
      form: {},
      detail: {},
      comment: {
        data: [],
        headSequence: '',
        lastSequence: '',
        pageSize: 100
      }
    }
  }

  getList (reload = false, cb) {
    this.$list(Api.list, this.list, reload, cb)
  }

  fav (eventId, index, cb) {
    http.post(Api.fav, {eventId}).then(d => {
      this.list.data[index].isFav = true
      cb && cb()
    })
  }

  unfav (eventId, index, cb) {
    http.post(Api.unfav, {eventId}).then(d => {
      this.list.data[index].isFav = false
      cb && cb()
    })
  }

  publish (data, cb) {
    http.post(Api.publish, data).then((d) => {
      cb && cb()
    })
  }

  /**
   * 添加 修改活动
   参数  是否必要  类型  说明
   eventId  是  string  活动id
   title  否  string  活动标题
   description  否  string  活动详情
   images  否  array  活动图片
   longitude  否  float  活动所在地点的经度(-180 ~ 180)
   latitude  否  float  活动所在地点的纬度(-90 ~ 90)
   address  否  string  活动所在地址
   startTime  否  date  活动开始时间(格式：2017-02-14 18:00:00)
   endTime  否  date  活动结束时间(格式：2017-02-15 18:00:00)
   joinLimit  否  int  报名人数上限(0为不限制，只可增多，不可减少)
   deadline  否  date  报名截至时间(格式：2017-02-14 18:00:00)
   */
  update (data, cb) {
    http.post(Api.update, data).then((d) => {
      cb && cb()
    })
  }

  info (eventId, cb) {
    http.get(Api.info, {eventId}).then((d) => {
      d.startTime = helper.formatTime(d.startTime)
      d.endTime = helper.formatTime(d.endTime)
      this.detail = d
      cb && cb()
    })
  }

  join (eventId) {
    http.post(Api.join, {eventId}).then(d => {
      cb && cb()
    })
  }

  commentlist (reload = false, cb) {
    this.$list(Api.commentlist, this.comment, reload, cb)
  }

  commentdel (commentId, cb) {
    http.post(Api.commentdel, {commentId}).then((d) => {
      cb && cb()
    })
  }

  commentadd (post, cb) {
    const {eventId, content, replyUid} = post
    http.post(Api.commentadd, {eventId, content, replyUid}).then((d) => {
      cb && cb()
    })
  }
}