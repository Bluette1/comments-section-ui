import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Comment extends Component {
  @service showTextBox;
  @service showReply;
  @service showDeleteComment;
  @service showEditInput;
  @service comments;

  get isReply() {
    const { reply } = this.args;
    return reply;
  }

  get lastReply() {
    // if (this.comments.lastReply) {
    return this.comments.lastReply;
    // }
  }

  @action textInput() {
    this.showTextBox.showInput(this.commentId);
  }

  get replyTo() {
    const {
      comment: { replyingTo },
    } = this.args;
    return `@${replyingTo}`;
  }

  get replyingTo() {
    const { comment } = this.args;
    const username = comment.user.username;
    return `@${username}`;
  }

  get isCurrentUser() {
    const { comment, currentUser } = this.args;
    const user = comment.user.username;
    const currUser = currentUser.get('username');
    return user === currUser;
  }

  @action edit() {
    this.showEditInput.showEdit(this.commentId);
  }

  get content() {
    const {
      comment: { content },
    } = this.args;
    return content;
  }

  get commentId() {
    const {
      comment: { id },
    } = this.args;

    return id;
  }

  get beingEdited() {
    return this.showEditInput.commentIds.includes(this.commentId);
  }

  get beingReplied() {
    return this.showTextBox.commentIds.includes(this.commentId);
  }

  get isReplied() {
    return this.showReply.commentIds.includes(this.commentId);
  }

  @action delete() {
    this.showDeleteComment.registerId(this.commentId);
    this.showDeleteComment.showDelete();

    const body = document.getElementsByClassName('main')[0];
    if (this.showDeleteComment.deleteComment) {
      body.classList.add('delete-comment');
    } else {
      body.classList.remove('delete-comment');
    }
  }
}
