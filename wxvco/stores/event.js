/**
 * Created by ken on 2017/5/31.
 */
const {Store, http} = wx.vco
const Api = {
  publish: '/api/event/publish',
  update: '/api/event/update',
  info: '/api/event/info',
  list: '/api/event/list',
  fav: '/api/event/fav',
  unfav: '/api/event/unfav'
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
      detail: {}
    }
  }

  getList (reload = false, cb) {
    let params = {
      pageSize: this.list.pageSize || 10
    }
    if (reload) {
      params.headSequence = this.list.headSequence
    } else if (this.list.lastSequence) {
      params.lastSequence = this.list.lastSequence
    } else if (this.list.lastSequence === false) {
      return cb && cb()
    }

    http.get(Api.list, params).then((d) => {
      const {list, lastSequence, headSequence} = d
      if (!reload) {
        this.list.data = this.list.data.concat(list)
        this.list.lastSequence = lastSequence || false
        this.list.headSequence = headSequence
      } else {
        list.map(d => {
          this.list.data.unshift(d)
        })
      }
      cb && cb()
    })
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

  publish (data) {
    http.post(Api.publish, data).then((d) => {
      console.log(d)
    })
  }

  update () {

  }

  info () {

  }
}