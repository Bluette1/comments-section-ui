import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ShowDeleteCommentService extends Service {
  @tracked deleteComment = false;

  @action showDelete() {
    this.deleteComment = !this.deleteComment;
  }
}
