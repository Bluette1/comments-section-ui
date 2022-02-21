import Service from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CommentsService extends Service {
  @tracked items = localStorage.getItem('items')
    ? JSON.parse(localStorage.getItem('items'))
    : A([]);
  @tracked lastReply = null;
  @tracked length = localStorage.getItem('length')
    ? parseInt(localStorage.getItem('length'))
    : 0;

  @action async initData(data) {
    await data.forEach(async (item) => {
      this.length += 1;
      const itm = item.toJSON();

      Promise.all([item.get('id'), item.get('user'), item.get('replies')]).then(
        async ([id, user, replies]) => {
          itm.id = id;
          itm.user = user.toJSON();
          this.getReplies(replies).then((responses) => {
            this.length += 1;
            localStorage.setItem('length', JSON.stringify(this.length));
            set(itm, 'replies', responses);
            this.items.pushObject(itm);
            localStorage.setItem('items', JSON.stringify(this.items));
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
    this.length -= 1;
    localStorage.setItem('length', JSON.stringify(this.length));
    localStorage.setItem('items', JSON.stringify(this.items));
  }

  @action update(commentId, content) {
    let idx = 0;

    this.items.forEach((comment) => {
      if (comment.id === commentId) {
        comment.content = content;
        const itms = this.items;
        this.items = [...itms.slice(0, idx), comment, ...itms.slice(idx + 1)];
      }

      let replyIdx = 0;
      comment.replies.forEach((reply) => {
        if (reply.id === commentId) {
          reply.content = content;

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
    // window.location.reload();
  }

  @action add(commentId, reply) {
    const found = this.findCommentIdx(commentId, this.items);
    if (found) {
      const [index, comment] = found;

      if (!comment.replies) {
        comment.replies = A([]);
      }
      comment.replies.pushObject(reply);

      this.lastReply = reply;
      const items = this.items;
      this.items = [
        ...items.slice(0, index),
        comment,
        ...items.slice(index + 1),
      ];
      this.length += 1;
      localStorage.setItem('length', JSON.stringify(this.length));
      localStorage.setItem('items', JSON.stringify(this.items));
    } else {
      let found;
      let foundIndex;
      for (let index = 0; index < this.items.length; index++) {
        const item = this.items[index];
        found = this.findCommentIdx(commentId, item.replies);
        foundIndex = index;
        if (found) {
          break;
        }
      }
      const comment = this.items[foundIndex];
      if (!comment.replies) {
        comment.replies = A([]);
      }
      comment.replies.pushObject(reply);
      const items = this.items;
      this.items = [
        ...items.slice(0, foundIndex),
        comment,
        ...items.slice(foundIndex + 1),
      ];
      this.length += 1;
      localStorage.setItem('length', JSON.stringify(this.length));
      localStorage.setItem('items', JSON.stringify(this.items));
    }
  }

  findCommentIdx(commentId, array) {
    for (let index = 0; index < array.length; index++) {
      const comment = array[index];
      if (comment.id === commentId) {
        return [index, comment];
      }
    }
  }
}
