import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  async model() {
    let user = this.store.findRecord('user', '1');

    let comments = this.store.findAll('comment');
    return { currentUser: user, comments };
  }
}
