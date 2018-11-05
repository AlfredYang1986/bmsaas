import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | arrange-class', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:arrange-class');
    assert.ok(route);
  });
});
