import Component from '@glimmer/component';
import { A } from '@ember/array';
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
    const length = 4; //Hard coded for now;

    const { commentId, replyingTo, currentUsr } = this.args;
    this.showTextBox.showInput(commentId);

    // add response to the comment
    // find the comment in the items collection
    // create the comment
    // add the comment to replies
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
    const found = this.findCommentIdx(commentId, this.comments.items);
    if (found) {
      const[index, comment] = found;

    if(!comment.replies) {
      comment.replies = A([]);
    }
    comment.replies.pushObject(reply);

    this.comments.lastReply = reply;
    const items = this.comments.items;
    this.comments.items = [
      ...items.slice(0, index),
      comment,
      ...items.slice(index + 1),
    ];
    localStorage.setItem('items', JSON.stringify(this.comments.items));

    } else {
      let found;
      let foundIndex;
      for (let index = 0; index < this.comments.items.length; index++) {
        const item = this.comments.items[index];
        found = this.findCommentIdx(commentId, item.replies);
        foundIndex = index;
        if (found) {
          break;
        }
      }
      const comment = this.comments.items[foundIndex];
      if (!comment.replies) {
        comment.replies = A([]);
      }
      comment.replies.pushObject(reply);
      const items = this.comments.items;
      this.comments.items = [
        ...items.slice(0, foundIndex),
        comment,
        ...items.slice(foundIndex + 1),
      ];
      localStorage.setItem('items', JSON.stringify(this.comments.items));
    }
  }

  findCommentIdx(commentId, array) {
    for (let index = 0; index < array.length; index++) {
      const comment = array[index];
      if (comment.id === commentId) {
        return [index, comment];
      }
    }
  }
}
