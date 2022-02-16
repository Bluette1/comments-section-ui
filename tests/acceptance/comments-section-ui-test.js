import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { run, later } from '@ember/runloop';

module('Acceptance | comments section ui', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
  });

  test('clicking reply btn', function (assert) {
    const done = assert.async();
    assert.expect(4);
    run(() => {
      visit('/').then(() => {
        assert.strictEqual(currentURL(), '/');
        assert.dom('.main').exists();
        later(() => {
          assert.dom('button.reply').exists();
          click('button.reply').then(() => {
            assert.dom('.reply-btn').exists();
            done();
          });
        }, 0);
      });
    });
  });

  test('clicking update btn', function (assert) {
    assert.expect(4);
    const done = assert.async();
    run(() => {
      visit('/').then(() => {
        assert.strictEqual(currentURL(), '/');
        assert.dom('.main').exists();
        later(() => {
          assert.dom('button.edit-btn').exists();
          click('button.edit-btn').then(() => {
            assert.dom('.update-btn').exists();
            done();
          });
        }, 0);
      });
    });
  });

  test.skip('clicking delete button', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('.main').exists();
    assert.dom('button.delete-btn').exists();
    await click('button.delete-btn');
    assert.dom('.delete-comment-div').exists();
  });

  test.skip('clicking cancel button on delete button', async function (assert) {
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
