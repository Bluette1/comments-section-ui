import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | delete-component', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<DeleteComponent />`);

    assert
      .dom(this.element)
      .includesText('Are you sure you want to delete this comment?');

    assert.dom('.delete-comment-div').exists();
    assert.dom('button.cancel').exists();
    assert.dom('button.cancel').hasText('NO, CANCEL');
    assert.dom('button.delete').exists();
    assert.dom('button.delete').hasText('YES, DELETE');
  });
});
