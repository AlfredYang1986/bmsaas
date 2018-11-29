import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifIncInput: '',
    noInputChecked: '',
    init() {
        this._super(...arguments);
        if(this.session.inc == '') {
            this.set('ifIncInput', 'disabled');
            this.set('noInputChecked', 'checked');
        }
    },
    actions: {
        noInc() {
            if(this.ifIncInput == '') {
                this.set('ifIncInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.inc', '');
            } else {
                this.set('ifIncInput', '');
                this.set('noInputChecked', '');
            }

        }
    }
});
