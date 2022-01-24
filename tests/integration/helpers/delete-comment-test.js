import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | delete-comment', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test.skip('it renders', async function (assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{delete-comment this.inputValue}}`);

    assert.dom(this.element).hasText('1234');
  });
});
