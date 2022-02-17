import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CommentsService extends Service {
  @tracked items = A([]);

  @action initData(data) {
    this.items = data;
  }

  @action remove(commentId) {
    this.items = this.items.filter((comment) => commentId !== comment.id);
    console.log('here!!!', this.items)
  }
}
