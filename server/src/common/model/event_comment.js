// 活动评论表
module.exports = {
  /**
   * 活动id
   */
  eventId: { type: String, default: '' },
  /**
   * 用户id
   */
  uid: { type: String, default: '' },
  /**
   * 回复的用户id
   */
  replyUid: { type: String, default: '' },
  /**
   * 评论内容
   */
  content: { type: String, default: '' },
};
