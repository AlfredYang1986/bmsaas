import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | edit/actv/rsb', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:edit/actv/rsb');
    assert.ok(route);
  });
});
