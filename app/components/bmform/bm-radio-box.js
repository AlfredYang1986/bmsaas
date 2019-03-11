import Component from '@ember/component';

export default Component.extend({
    tagName: '',
    positionalParams: ['name', 'text', 'inputVal', 'isChecked', 'disabled'],
    actions: {
        choose() {
            let attrs = this.get('attrs');
            attrs.isChecked = this.isChecked
            // this.sendAction('radioClick', attrs)
        }
    }
});
