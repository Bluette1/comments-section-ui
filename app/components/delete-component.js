import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DeleteComponentComponent extends Component {
  @service showDeleteComment;
  @service comments;

  @action delete() {
    this.showDeleteComment.showDelete();
    const body = document.getElementsByClassName('main')[0];
    if (this.showDeleteComment.deleteComment) {
      body.classList.add('delete-comment');
    } else {
      body.classList.remove('delete-comment');
    }
  }

  @action remove() {
    this.showDeleteComment.showDelete();
    const body = document.getElementsByClassName('main')[0];
    body.classList.remove('delete-comment');
    this.comments.remove(this.showDeleteComment.commentId);

    this.items = this.comments.items.filter(
      (item) => item.id !== this.showDeleteComment.commentId
    );
    this.items.forEach((item) => {
      item.replies.forEach((itm) => {
        if (itm.id == this.showDeleteComment.commentId) {
          item.replies.removeObject(itm);
        }
      });
    });
  }
}
