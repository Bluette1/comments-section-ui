import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | user', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('user', {});
    assert.ok(model);
  });

  test('should have many comments', function (assert) {
    const User = this.owner.lookup('service:store').modelFor('user');

    const relationship = User.relationshipsByName.get('comments');

    assert.strictEqual(relationship.key, 'comments', 'has relationship with comments');
    assert.strictEqual(
      relationship.kind,
      'hasMany',
      'kind of relationship is hasMany'
    );
  });
});
