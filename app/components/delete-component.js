import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import deleteComment from '../helpers/delete-comment';

export default class DeleteComponentComponent extends Component {
  @service showDeleteComment;

  @action delete() {
    this.showDeleteComment.showDelete();
    deleteComment(this.showDeleteComment.deleteComment);
  }

  @action remove() {}
}
