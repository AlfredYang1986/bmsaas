import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bm-select-wrap/bm-select-box-wrap-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{bm-select-wrap/bm-select-box-wrap-item}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bm-select-wrap/bm-select-box-wrap-item}}
        template block text
      {{/bm-select-wrap/bm-select-box-wrap-item}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
