import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ShowDeleteCommentService extends Service {
 @tracked deleteComment = false;

 @action showDelete() {
    console.log('Show DELEYTE!!!!');
    this.deleteComment = !this.deleteComment;
  }
}
