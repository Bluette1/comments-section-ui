import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | comment', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('comment', {});
    assert.ok(model);
  });

  test('should belong to a user', function (assert) {
    const Comment = this.owner.lookup('service:store').modelFor('comment');

    const relationship = Comment.relationshipsByName.get('user');

    assert.strictEqual(relationship.key, 'user', 'has relationship with user');
    assert.strictEqual(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });
});
