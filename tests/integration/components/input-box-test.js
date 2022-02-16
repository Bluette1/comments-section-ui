import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | input-box', function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    this.setProperties({
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      currentUser: {
        png: '../assets/images/image-juliusomo.png',
        webp: '../assets/images/image-juliusomo.webp',
        username: 'juliusomo',
      },
    });
  });

  test('it renders `update` input textbox ', async function (assert) {
    await render(
      hbs`<InputBox @content={{this.content}} @currentUsr={this.currentUser}} @update={{true}} />`
    );
    assert.dom('.input-div').exists();
    assert.dom('.reply-btn.update-btn').exists();
    assert.dom('.reply-btn.update-btn').hasText('Update');
    assert.dom('label textarea').exists();
    assert.dom('label textarea').hasValue(this.content);
    assert.dom('label textarea').hasAttribute('name', 'update');
  });

  test('it renders `reply` input textbox ', async function (assert) {
    await render(
      hbs`<InputBox @currentUsr={this.currentUser}} @reply={{true}} />`
    );
    assert.dom('.input-div').exists();
    assert.dom('.reply-btn').exists();
    assert.dom('.reply-btn').hasText('Reply');
    assert.dom('label textarea').exists();
    assert
      .dom('label textarea')
      .hasAttribute('placeholder', 'Add a comment...');
    assert.dom('label textarea').hasAttribute('name', 'comment');
  });

  test('it renders `send` input textbox ', async function (assert) {
    await render(hbs`<InputBox @currentUsr={this.currentUser}} />`);
    assert.dom('.input-div').exists();
    assert.dom('.reply-btn').exists();
    assert.dom('.reply-btn').hasText('Send');
    assert.dom('label textarea').exists();
    assert
      .dom('label textarea')
      .hasAttribute('placeholder', 'Add a comment...');
    assert.dom('label textarea').hasAttribute('name', 'comment');
  });
});
