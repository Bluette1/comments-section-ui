import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class DeleteComponentComponent extends Component {
  @service showDeleteComment;

  @action delete() {
    this.showDeleteComment.showDelete();
    const body = document.getElementsByClassName('main')[0];
    if (this.showDeleteComment.deleteComment) {
      body.classList.add('delete-comment');
    } else {
      body.classList.remove('delete-comment');
    }
  }

  @action remove() {}
}
