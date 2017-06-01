/**
 * redis key定义
 * 规则：module: {
 *      key1: function(param1, param2, ...){
 *          return `xxxx${param1}yyyy${param2}`;
 *      }
 * }
 */
module.exports = {
  /**
   * 系统
   */
  system: {
    /**
     * 管理员后台登录url
     * @param uid 管理员用户id
     */
    adminUrlKey(uid) {
      return `adminUrl:${uid}`;
    },
  },
};
