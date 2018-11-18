import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | /detail/exp-field', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:/detail/exp-field');
    assert.ok(controller);
  });
});
