import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | show-text-box', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:show-text-box');
    assert.ok(service);
  });
});
