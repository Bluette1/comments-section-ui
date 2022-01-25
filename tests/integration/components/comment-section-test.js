import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comment-section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      currentUser: {
        image: {
          png: '../assets/images/image-juliusomo.png',
          webp: '../assets/images/image-juliusomo.webp',
        },
        username: 'juliusomo',
      },
      commentReply: {
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: '1 month ago',
        score: 12,
        user: {
          image: {
            png: '../assets/images/image-amyrobson.png',
            webp: '../assets/images/image-amyrobson.webp',
          },
          username: 'amyrobson',
        },
        replies: [],
      },
    });

    await render(
      hbs`<CommentSection @commentReply={{this.commentReply}} @currentUser={{this.currentUser}}/>`
    );
    assert.dom('.comment-div').exists();
    assert.dom('div.count').exists();
    assert.dom('button.reply').exists();
    assert
      .dom('.comment-text')
      .includesText(
        'Impressive! Though it seems the drag feature could be improved.'
      );
    assert.dom('button.reply').includesText('Reply');
    assert
      .dom('.comment-header .avatar img')
      .hasAttribute('src', '../assets/images/image-amyrobson.webp');
  });

  test('it renders comment with `edit` and `delete` buttons , when the author is current user', async function (assert) {
    this.setProperties({
      currentUser: {
        image: {
          png: '../assets/images/image-juliusomo.png',
          webp: '../assets/images/image-juliusomo.webp',
        },
        username: 'juliusomo',
      },
      commentReply: {
        id: 2,
        content:
          "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        createdAt: '2 weeks ago',
        score: 5,
        user: {
          image: {
            png: '../assets/images/image-maxblagun.png',
            webp: '../assets/images/image-maxblagun.webp',
          },
          username: 'maxblagun',
        },
        replies: [
          {
            id: 3,
            content:
              "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            createdAt: '1 week ago',
            score: 4,
            replyingTo: 'maxblagun',
            user: {
              image: {
                png: '../assets/images/image-ramsesmiron.png',
                webp: '../assets/images/image-ramsesmiron.webp',
              },
              username: 'ramsesmiron',
            },
          },
          {
            id: 4,
            content:
              "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            createdAt: '2 days ago',
            score: 2,
            replyingTo: 'ramsesmiron',
            user: {
              image: {
                png: '../assets/images/image-juliusomo.png',
                webp: '../assets/images/image-juliusomo.webp',
              },
              username: 'juliusomo',
            },
          },
        ],
      },
    });

    await render(
      hbs`<CommentSection @commentReply={{this.commentReply}} @currentUser={{this.currentUser}}/>`
    );
    assert.dom('.edit-delete').exists();
    assert.dom('div.count').exists();
    assert.dom('button.reply').exists();
    assert.dom('button.edit-btn').includesText('Edit');
    assert.dom('button.delete-btn').includesText('Delete');
  });
});
