import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { run, later } from '@ember/runloop';

module('Acceptance | comments section ui', function (hooks) {
  setupApplicationTest(hooks);

  test('clicking reply btn', function (assert) {
    const done = assert.async();
    assert.expect(4);
    run(() => {
      visit('/').then(() => {
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
          assert.dom('button.reply').exists();
          click('button.reply').then(() => {
            assert.dom('.reply-btn').exists();
            done();
          });
        }, 0);
      });
    });
  });

  test('the create function works', function (assert) {
    const done = assert.async();
    assert.expect(4);
    run(() => {
      visit('/').then(() => {
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
          assert.dom('.input-div ').exists();
          fillIn('textarea', 'Hello, I am creating a new comment!').then(() => {
            click('.reply-btn button').then(() => {
              assert
                .dom('.main')
                .includesText('Hello, I am creating a new comment!');
              done();
            });
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
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
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
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
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
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
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

  test('The reply function adds a new comment', function (assert) {
    const done = assert.async();
    assert.expect(6);
    run(() => {
      visit('/').then(() => {
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
          assert.dom('button.reply').exists();
          click('button.reply').then(() => {
            assert.dom('.reply-btn').exists();
            fillIn('textarea', 'Hello!').then(() => {
              click('button.input-reply').then(() => {
                assert.dom('.added').exists();
                assert.dom('.added').includesText('Hello!');
                done();
              });
            });
          });
        }, 0);
      });
    });
  });

  test('The update function updates a comment', function (assert) {
    assert.expect(6);
    const done = assert.async();
    run(() => {
      visit('/').then(() => {
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
          assert.dom('.first-level-by-current-user button.edit-btn').exists();
          click('.first-level-by-current-user button.edit-btn').then(() => {
            assert.dom('.update-btn').exists();
            assert.dom('button.input-update').exists();
            fillIn('textarea', 'Hello!').then(() => {
              click('button.input-update').then(() => {
                assert
                  .dom('.first-level-by-current-user')
                  .includesText('Hello!');
                done();
              });
            });
          });
        }, 0);
      });
    });
  });

  test('clicking delete button on delete button', function (assert) {
    assert.expect(7);
    const done = assert.async();
    run(() => {
      visit('/').then(() => {
        later(() => {
          assert.strictEqual(currentURL(), '/');
          assert.dom('.main').exists();
          assert
            .dom('.first-level-by-current-user.added button.delete-btn')
            .exists();
          click('.first-level-by-current-user.added button.delete-btn').then(
            () => {
              assert.dom('.delete-comment-div').exists();
              click('button.delete').then(() => {
                assert.dom('.delete-comment-div').doesNotExist();
                assert
                  .dom('.first-level-by-current-user.added button.delete-btn')
                  .doesNotExist();
                assert
                  .dom('.first-level-by-current-user.added button.edit-btn')
                  .doesNotExist();
                done();
              });
            }
          );
        }, 0);
      });
    });
  });
});
