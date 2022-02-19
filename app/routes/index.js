import Route from '@ember/routing/route';
import { inject, service } from '@ember/service';

export default class IndexRoute extends Route {
  @inject store;
  @service comments;
  async model() {
    let user = this.store.findRecord('user', '1');

    let commentItems = await this.store.findAll('comment');
    await this.comments.initData(commentItems);

    return { currentUser: user };
  }
}
