import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service, inject } from '@ember/service';

export default class InputBoxComponent extends Component {
  @service showEditInput;
  @service showReply;
  @service showTextBox;
  @inject store;
  @tracked content = this.args.content;
  @service comments;
  @tracked response = this.args.reply;

  @action update() {
    const { commentId } = this.args;

    this.showEditInput.showEdit(commentId);
    this.comments.update(commentId, this.content);
  }

  @action reply() {
    const length = this.comments.length;

    const { commentId, replyingTo, currentUsr } = this.args;
    this.showTextBox.showInput(commentId);

    const reply = {
      id: length + 1,
      content: this.content,
      user: {
        ...currentUsr,
        username: currentUsr.get('username'),
        webp: currentUsr.get('webp'),
      },
      score: 0,
      replyingTo,
      createdAt: 'seconds ago',
      replies: [],
      added: true,
    };
    this.comments.add(commentId, reply);
  }
}
