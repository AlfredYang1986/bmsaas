import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | detail/exp', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:detail/exp');
    assert.ok(route);
  });
});
