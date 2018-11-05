import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | detail/experience', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:detail/experience');
    assert.ok(route);
  });
});
