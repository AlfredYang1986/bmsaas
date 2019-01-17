import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | bm applicant', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('bm-applicant', {});
    assert.ok(model);
  });
});
