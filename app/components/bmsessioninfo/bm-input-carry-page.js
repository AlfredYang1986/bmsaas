import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifCarryInput: '',
    noInputChecked: '',
    init() {
        this._super(...arguments);
        if(this.session.carrying == '') {
            this.set('ifCarryInput', 'disabled');
            this.set('noInputChecked', 'checked');
        }
    },
    actions: {
        noCarry() {
            if(this.ifCarryInput == '') {
                this.set('ifCarryInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.carrying', '');
            } else {
                this.set('ifCarryInput', '');
                this.set('noInputChecked', '');
            }

        }
    }
});
