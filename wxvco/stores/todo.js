const {extendObservable} = getApp().vco.mobx
module.exports = function () {
  extendObservable(this, {
    // observable data
    todos: [],
    todoText: 0,
    userInfo: {},
    // computed data
    get count() {
      return this.todos.length;
    }
  });

  // action
  this.addTodo = function (title) {
    this.todos.push({title: title});
    this.t
  }

  this.removeTodo = function () {
    this.todos.pop();
  }

  this.utxt = function () {
    this.t = setInterval(() => {
      this.todoText += 1
    }, 1000)
  }

  this.ut = function () {
    clearInterval(this.t)
  }
  this.setUser = function (o) {
    this.userInfo = o
  }
}
