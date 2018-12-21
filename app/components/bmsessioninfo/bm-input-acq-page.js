import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ifAcqInput: '',
    noInputChecked: '',
    acqInput: true,
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('ifAcqInput', '');
            this.set('acqInput', true)
        } else {
            if(this.session.acquisition == '') {
                this.set('ifAcqInput', 'disabled');
                this.set('acqInput', false)
            }
        }

    },
    actions: {
        noAcq() {
            if(this.ifAcqInput == '') {
                this.set('ifAcqInput', 'disabled');
                this.set('noInputChecked', 'checked');
                this.set('session.acquisition', '');
                this.set('acqInput', false)
            } else {
                this.set('ifAcqInput', '');
                this.set('noInputChecked', '');
                this.set('acqInput', true)
            }

        }
    }
});
