import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class ShowTextBoxService extends Service {
  @tracked commentIds = A([]);

  @action showInput(commentId) {
    if (this.commentIds.includes(commentId)) {
      this.commentIds.removeObject(commentId);
    } else {
      this.commentIds.pushObject(commentId);
    }
  }
}
