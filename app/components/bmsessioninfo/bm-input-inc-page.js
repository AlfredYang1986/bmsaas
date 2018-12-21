import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifIncInput: '',
    noInputChecked: '',
    incInput: true,
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('ifIncInput', '');
            this.set('incInput', true);
        } else {
            if(this.session.inc == '') {
                this.set('ifIncInput', 'disabled');
                this.set('incInput', false);
            }
        }

    },
    actions: {
        noInc() {
            if(this.ifIncInput == '') {
                this.set('ifIncInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.inc', '');
                this.set('incInput', false);
            } else {
                this.set('ifIncInput', '');
                this.set('noInputChecked', '');
                this.set('incInput', true);
            }

        }
    }
});
