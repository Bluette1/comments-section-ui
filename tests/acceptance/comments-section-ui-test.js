import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | comments section ui', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
  });

  test('clicking reply btn', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
    assert.dom('button.reply').exists();
    await click('button.reply');
    assert.dom('.reply-btn').exists();
  });

  test('clicking update btn', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
    assert.dom('button.edit-btn').exists();
    await click('button.edit-btn');
    assert.dom('.update-btn').exists();
  });

  test('clicking delete button', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
    assert.dom('button.delete-btn').exists();
    await click('button.delete-btn');
    assert.dom('.delete-comment-div').exists();
  });

  test('clicking cancel button on delete button', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
    assert.dom('button.delete-btn').exists();
    await click('button.delete-btn');
    assert.dom('.delete-comment-div').exists();
    await click('button.cancel');
    assert.dom('.delete-comment-div').doesNotExist();
  });
});
