import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | comments section ui', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /comments-section-ui', async function (assert) {
    await visit('/comments-section-ui');

    assert.strictEqual(currentURL(), '/comments-section-ui');
  });
});
