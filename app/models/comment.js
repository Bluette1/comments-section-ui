import Model, { attr, hasMany, inverse, belongsTo } from '@ember-data/model';

export default class CommentModel extends Model {
  @hasMany ('comment', { async: true, inverse: null }) replies;
  @attr content;
  @attr createdAt;
  @attr score;
  @attr webp;
  @attr username;
}
