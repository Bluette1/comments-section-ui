import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @hasMany('comment') comments;
  @attr webp;
  @attr username;
}
