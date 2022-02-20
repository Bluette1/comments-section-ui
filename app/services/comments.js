import Service from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CommentsService extends Service {
  @tracked items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : A([]);
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
              localStorage.setItem('items', JSON.stringify(this.items));
          });
        });
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
    let idx = 0;
    this.items.forEach((item) => {
      item.replies.forEach((itm) => {
        if (itm.id === commentId) {
          item.replies.removeObject(itm);
        }
        const comments = this.items;
          this.items = [
            ...comments.slice(0, idx),
            item,
            ...comments.slice(idx + 1),
          ];
      });
      idx += 1;
    });
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  @action update(commentId, content) {
    let idx = 0;
    
    this.items.forEach((comment) => {

      if (comment.id === commentId) {
        comment.content = content;
        const itms = this.items;
        this.items = [
          ...itms.slice(0, idx),
          comment,
          ...itms.slice(idx + 1),
        ];
      }
      
      let replyIdx = 0;
      comment.replies.forEach((reply) => {
        if (reply.id === commentId) {
          reply.content = content;
          console.log('reply.content: ', reply.content);
          console.log('content', content)
          const replies = comment.replies;
          comment.replies = [
            ...replies.slice(0, replyIdx),
            reply,
            ...replies.slice(replyIdx + 1),
          ];

          const comments = this.items;
          this.items = [
            ...comments.slice(0, idx),
            comment,
            ...comments.slice(idx + 1),
          ];

        }

        replyIdx += 1;
      });
      
      idx += 1;
    });
    localStorage.setItem('items', JSON.stringify(this.items));
    window.location.reload();
  }
}
