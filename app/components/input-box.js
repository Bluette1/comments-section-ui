import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service, inject } from '@ember/service';

export default class InputBoxComponent extends Component {
  @service showEditInput;
  @inject store;
  @tracked content = this.args.content;

  @action update() {
    const {commentId} = this.args;
    this.showEditInput.showEdit(commentId);
    
    this.store.findRecord('comment', commentId).then((comment)=>{
      comment.set('content', this.content);
      comment.save();
    });

  }
}
