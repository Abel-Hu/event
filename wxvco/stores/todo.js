const {Store} = getApp().vco
module.exports = class extends Store {
  state() {
    return {
      // observable data
      todos: [],
      todoText: 0,
      userInfo: {},
      // computed data
      get count() {
        return this.todos.length
      }
    }
  }

  addTodo(title) {
    this.todos.push({title: title})
    this.t
  }

  removeTodo() {
    this.todos.pop()
  }

  utxt() {
    this.t = setInterval(() => {
      this.todoText += 1
    }, 1000)
  }

  ut() {
    clearInterval(this.t)
  }

  setUser(o) {
    this.userInfo = o
  }
}
