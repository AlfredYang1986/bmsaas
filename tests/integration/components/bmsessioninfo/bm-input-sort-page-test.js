import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bmsessioninfo/bm-input-sort-page', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{bmsessioninfo/bm-input-sort-page}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bmsessioninfo/bm-input-sort-page}}
        template block text
      {{/bmsessioninfo/bm-input-sort-page}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
