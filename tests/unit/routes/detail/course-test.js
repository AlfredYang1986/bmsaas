import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | detail/course', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:detail/course');
    assert.ok(route);
  });
});
