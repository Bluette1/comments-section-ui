import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  async model() {
    
    // let response = await fetch('/api/comments.json');
    // let data = await response.json();
    // return data;
    let response = await fetch('/api/user.json');
    let user = await response.json();

    let comments = this.store.findAll('comment');
    console.log('COMMENTS: ', comments)
    return {currentUser: user, comments};
  }
}
