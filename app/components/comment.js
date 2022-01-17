import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Comment extends Component {
  @tracked showTextBox = false;

  get isReply() {
    const { reply } = this.args;
    return reply;
  }

  @action textInput() {
    this.showTextBox = !this.showTextBox;
  }
}
