import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class ShowUpdateService extends Service {
  @tracked commentIds = A([]);
  @tracked content = '';

  @action update(commentId, content) {
    this.content = content;
    if (this.commentIds.includes(commentId)) {
      this.commentIds.removeObject(commentId);
    } else {
      this.commentIds.pushObject(commentId);
    }
  }
}
