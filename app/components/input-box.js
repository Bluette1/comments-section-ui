import Component from '@glimmer/component';
// import ObjectProxy from '@ember/object/proxy';
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

    this.comments.items.forEach((comment) => {
      if (comment.id == commentId) {
        comment.content = this.content;
      }
    });
  }

  @action reply() {
    const length = 4; //Hard coded for now;

    const { commentId, replyingTo, currentUsr } = this.args;
    this.showTextBox.showInput(commentId);

    // add response to the comment
    // find the comment in the items collection
    // create the comment
    // add the comment to replies

    const [index, comment] = this.findCommentIdx(commentId);
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
    };
    // comment.replies.pushObject(reply);
    this.comments.lastReply = reply;
    const items = this.comments.items;
    this.comments.items = [
      ...items.slice(0, index),
      comment,
      ...items.slice(index + 1, index),
    ];

    // Update this.showReply service
    this.showReply.showRes(commentId);
  }

  findCommentIdx(commentId) {
    for (let index = 0; index < this.comments.items.length; index++) {
      const comment = this.comments.items[index];
      if (comment.id === commentId) {
        return [index, comment];
      }
    }
  }
}
