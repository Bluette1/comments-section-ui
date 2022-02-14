import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class CommentModel extends Model {
  @hasMany('comment', { inverse: null }) replies;
  @belongsTo('user') user;
  @attr content;
  @attr createdAt;
  @attr score;
  @attr replyingTo;
}
