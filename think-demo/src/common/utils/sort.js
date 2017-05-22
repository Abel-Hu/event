module.exports = {
  /**
   * 根据kv结构的key排序
   * @param data kv结构的数据
   * @param orderby asc or desc
   * @return k根据自然排序顺序排列
   */
  sortKey(data, orderby = 'asc') {
    const tmpArr = Object.keys(data).map(v => v);

    if (orderby === 'asc') {
      tmpArr.sort((a, b) => a.localeCompare(b));
    } else {
      tmpArr.sort((a, b) => b.localeCompare(a));
    }

    return tmpArr;
  },
  /**
   * 数组排序
   * @param array 数组
   * @param orderby asc or desc
   */
  sortArray(array, orderby = 'asc') {
    if (orderby === 'asc') {
      array.sort((a, b) => a - b);
    } else {
      array.sort((a, b) => b - a);
    }
    return array;
  },
};
