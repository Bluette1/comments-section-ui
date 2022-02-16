import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Comment extends Component {
  @tracked showTextBox = false;
  @service showDeleteComment;
  @service showEditInput;

  get isReply() {
    const { reply } = this.args;
    return reply;
  }

  @action textInput() {
    this.showTextBox = !this.showTextBox;
  }

  get replyTo() {
    const {
      comment: { replyingTo },
    } = this.args;
    return `@${replyingTo}`;
  }

  get isCurrentUser() {
    const { comment, currentUser } = this.args;
    const user = comment.user.get('username');
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
    // console.log('isBeingEdited$$$$$$$$$$$$$', this.showEditInput.commentIds.includes(this.commentId))
    return (this.showEditInput.commentIds.includes(this.commentId));
  }

  @action delete() {
    this.showDeleteComment.showDelete();
    const body = document.getElementsByClassName('main')[0];
    if (this.showDeleteComment.deleteComment) {
      body.classList.add('delete-comment');
    } else {
      body.classList.remove('delete-comment');
    }
  }
}
