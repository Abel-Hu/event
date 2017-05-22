module.exports = class IndexController extends think.Controller {
  __before(){
  }
  async indexAction(){
    var {jed, numeral, moment} = this.i18n();
    let user = this.model('user');
    this.success(await user.select());
  }
  __after(){
    //console.log('__after')
  }
}