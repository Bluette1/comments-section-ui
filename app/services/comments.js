import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CommentsService extends Service {
  @tracked items = A([]);

  @action initData(data) {
    this.items = data;
  }
}
