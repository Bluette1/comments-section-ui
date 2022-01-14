import Component from '@glimmer/component';

export default class Comment extends Component {
  get isReply() {
    const { reply } = this.args;
    return reply;
  }
}
