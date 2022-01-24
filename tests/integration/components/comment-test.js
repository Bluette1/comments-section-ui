import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comment', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {

    this.setProperties({
      currentUser: {
        "image": {
          "png": "../assets/images/image-juliusomo.png",
          "webp": "../assets/images/image-juliusomo.webp"
        },
        "username": "juliusomo"
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

    await render(hbs`<Comment @comment={{this.commentReply}} @currentUser={{this.currentUser}} />`);
    assert.dom('.comment-div').exists();
  });
});
