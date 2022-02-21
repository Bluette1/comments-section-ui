import Route from '@ember/routing/route';
import { inject, service } from '@ember/service';

export default class IndexRoute extends Route {
  @inject store;
  @service comments;
  async model() {
    const items = localStorage.getItem('items');
    if (!items) {
      let commentItems = await this.store.findAll('comment');
      await this.comments.initData(commentItems);
    }
    let user = this.store.findRecord('user', '1');

    return { currentUser: user };
  }
}
