import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifCarryInput: '',
    noInputChecked: '',
    carryInput: true,
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('ifCarryInput', '');
            this.set('carryInput', true);
        } else {
            if(this.session.carrying == '') {
                this.set('ifCarryInput', 'disabled');
                this.set('carryInput', false);
            }
        }
    },
    actions: {
        noCarry() {
            if(this.ifCarryInput == '') {
                this.set('ifCarryInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.carrying', '');
                this.set('carryInput', false);
            } else {
                this.set('ifCarryInput', '');
                this.set('noInputChecked', '');
                this.set('carryInput', true);
            }

        }
    }
});
