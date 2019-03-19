import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bmtable/bm-table-pt-stud', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{bmtable/bm-table-pt-stud}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bmtable/bm-table-pt-stud}}
        template block text
      {{/bmtable/bm-table-pt-stud}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
