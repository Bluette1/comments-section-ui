import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service, inject } from '@ember/service';

export default class InputBoxComponent extends Component {
  @service showEditInput;
  @inject store;
  @tracked content = this.args.content;
  @service comments;

  @action update() {
    const { commentId } = this.args;
    this.showEditInput.showEdit(commentId);

    this.comments.items.forEach((comment) => {
      if (comment.id == commentId) {
        comment.content = this.content;
      }
    });
  }
}
