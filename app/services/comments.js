import Service from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CommentsService extends Service {
  @tracked items = A([]);
  @tracked lastReply = null;

  @action async initData(data) {
    await data.forEach(async (item) => {
      const itm = item.toJSON();

      Promise.all([item.get('id'), item.get('user'), item.get('replies')]).then(
        async ([id, user, replies]) => {
          itm.id = id;
          itm.user = user.toJSON();
          this.getReplies(replies).then((responses) => {
            set(itm, 'replies', responses);
            this.items.pushObject(itm);
          });
        }
      );
    });
  }

  async getReplies(replies) {
    const itmReplies = A([]);

    await Promise.all(
      replies.map(async (reply) => {
        const repUser = await reply.get('user');
        const id = reply.get('id');
        let rep = reply;
        rep = rep.toJSON();
        set(rep, 'id', id);

        rep.user = repUser.toJSON();
        itmReplies.pushObject(rep);
      })
    );
    return itmReplies.sortBy('id');
  }

  @action remove(commentId) {
    this.items = this.items.filter((comment) => commentId !== comment.id);
  }
}
