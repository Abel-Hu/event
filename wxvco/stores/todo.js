const {Store} = wx.vco
module.exports = class extends Store {
  state () {
    return {
      todoText: 0
    }
  }

  utxt () {
    this.t = setInterval(() => {
      this.todoText += 1
    }, 1000)
  }

  ut () {
    clearInterval(this.t)
  }

}
