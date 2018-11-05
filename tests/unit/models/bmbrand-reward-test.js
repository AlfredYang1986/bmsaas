import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | bmbrand reward', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('bmbrand-reward', {});
    assert.ok(model);
  });
});
