import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | comment-section', function (hooks) {
  setupRenderingTest(hooks);

  // hooks.beforeEach(function () {
  //   this.owner.register('component:comment', Ember.Component.extend());
  // });

  test.skip('it renders', async function (assert) {
    await render(
      hbs`<CommentSection @commentReply=commentReply @currentUser=currentUser/>`
    );
    assert(true, true);
  });
});
