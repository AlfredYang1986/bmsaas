import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    inputChecked: 'checked',
    inputNoChecked: '',
    lengthIf: true,
    actions: {
        lengthInputSelected() {
            if(this.inputChecked == '') {
                this.set('lengthIf', true);
                this.set('inputChecked', 'checked');
                this.set('inputNoChecked', '');
                this.set('session.length', 0)
            }
        },
        lengthNoSelected() {
            if(this.inputChecked == 'checked') {
                this.set('lengthIf', false);
                this.set('inputChecked', '');
                this.set('inputNoChecked', 'checked');
                this.set('session.length', -1)
            }
        },
    }
});
