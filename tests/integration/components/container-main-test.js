import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | container-main', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ContainerMain />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <ContainerMain>
        template block text
      </ContainerMain>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
