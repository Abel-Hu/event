module.exports = {
  /**
   * 返回 min ~ max 的随机数
   * @param min 最小值
   * @param max 最大值
   */
  rand(min, max) {
    const range = max - min;
    const rand = Math.random();
    return min + Math.round(rand * range);
  },
};
