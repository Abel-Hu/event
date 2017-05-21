const Base = requireBaseController();
module.exports = class extends Base {
  init(...args) {
    super.init(...args);
    this.whiteList = ['index'];
  }

  async indexAction() {
    const key = 'vtfg87h9ionjbhuygy87h9';
    const ok = await redis.set(key, key);
    console.log(`redis set: ${ok}`);
    const result = await redis.get(key);
    console.log(`redis get: ${result}`);
    return this.success('work hard! play hard!');
  }
};
