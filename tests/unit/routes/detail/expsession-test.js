import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | detail/expsession', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:detail/expsession');
    assert.ok(route);
  });
});
