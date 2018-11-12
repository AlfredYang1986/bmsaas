import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | bm-session-update-service', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:bm-session-update-service');
    assert.ok(service);
  });
});

