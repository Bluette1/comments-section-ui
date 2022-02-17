import Component from '@glimmer/component';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ContainerMainComponent extends Component {
  @service showDeleteComment;
  @service comments;
  @tracked commentData = this.comments.items;
}
