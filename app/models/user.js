import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @hasMany('comment', { async: true }) comments;
  @attr webp;
  @attr username;
}
