import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | detail/tech', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:detail/tech');
    assert.ok(route);
  });
});
