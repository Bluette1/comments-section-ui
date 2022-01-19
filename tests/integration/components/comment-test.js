import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comment', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.setProperties({
      commentReply: {
        id: 1,
        content:
          "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        createdAt: '1 month ago',
        score: 12,
        user: {
          image: {
            png: '../assets/images/avatars/image-amyrobson.png',
            webp: '../assets/images/avatars/image-amyrobson.webp',
          },
          username: 'amyrobson',
        },
        replies: [],
      },
    });

    await render(hbs`<Comment @comment={{commentReply}} />`);
    assert.dom('.comment-div').exists();
  });
});
