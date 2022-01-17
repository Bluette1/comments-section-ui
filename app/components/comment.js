import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comment extends Component {
  @tracked showTextBox = false;
  @tracked showEditInput = false;

  get isReply() {
    const { reply } = this.args;
    return reply;
  }

  @action textInput() {
    this.showTextBox = !this.showTextBox;
  }

  get replyTo(){
    const { comment: { replyingTo} } = this.args;
    return `@${replyingTo}`;
  }

  get isCurrentUser() {
    const { comment: { user: { username } }, currentUser: {username: currUser}} = this.args;
    return username === currUser;
  }

  @action edit() {
    this.showEditInput = !this.showEditInput;
  }

  get content() {
    const { comment: { content } } = this.args;
    return content;
  }

  delete() {}
}
