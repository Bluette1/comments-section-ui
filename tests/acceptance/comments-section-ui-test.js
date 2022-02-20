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

  test.skip('clicking reply btn', function (assert) {
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

  test('clicking delete button', function (assert) {
    assert.expect(4);
    const done = assert.async();
    run(() => {
      visit('/').then(() => {
        assert.strictEqual(currentURL(), '/');
        assert.dom('.main').exists();
        later(() => {
          assert.dom('button.delete-btn').exists();
          click('button.delete-btn').then(() => {
            assert.dom('.delete-comment-div').exists();
            done();
          });
        }, 0);
      });
    });
  });
  
  test('clicking cancel button on delete button', async function (assert) {
    assert.expect(5);
    const done = assert.async();
    run(() => {
      visit('/').then(() => {
        assert.strictEqual(currentURL(), '/');
        assert.dom('.main').exists();
        later(() => {
          assert.dom('button.delete-btn').exists();
          click('button.delete-btn').then(() => {
            assert.dom('.delete-comment-div').exists();
            click('button.cancel').then(() => {
              assert.dom('.delete-comment-div').doesNotExist();
              done();
            });
          });
        }, 0);
      });
    });
  });
});
