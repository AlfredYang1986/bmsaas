import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bmdetail/stud-basis-left-subtitle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{bmdetail/stud-basis-left-subtitle}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#bmdetail/stud-basis-left-subtitle}}
        template block text
      {{/bmdetail/stud-basis-left-subtitle}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
