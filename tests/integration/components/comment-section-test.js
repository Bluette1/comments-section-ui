import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comment-section', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
   

  const commentReply = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "1 month ago",
      "score": 12,
      "user": {
        "image": {
          "png": "../images/avatars/image-amyrobson.png",
          "webp": "../images/avatars/image-amyrobson.webp"
        },
        "username": "amyrobson"
      },
      "replies": []
    }
 
    await render(hbs`<CommentSection @commentReply={{commentReply}} />`);
    assert(true, true)
     
  });
});
