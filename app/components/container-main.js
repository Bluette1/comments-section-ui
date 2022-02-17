import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ContainerMainComponent extends Component {
  @service showDeleteComment;
  @service comments;

  get commentData() {
    return this.comments.items;
  }
}
