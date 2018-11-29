import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifAcqInput: '',
    noInputChecked: '',
    init() {
        this._super(...arguments);
        if(this.session.acquisition == '') {
            this.set('ifAcqInput', 'disabled');
            this.set('noInputChecked', 'checked');
        }
    },
    actions: {
        noAcq() {
            if(this.ifAcqInput == '') {
                this.set('ifAcqInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.acquisition', '');
            } else {
                this.set('ifAcqInput', '');
                this.set('noInputChecked', '');
            }

        }
    }
});
