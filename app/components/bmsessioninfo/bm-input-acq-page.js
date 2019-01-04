import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    // ifAcqInput: '',
    // noInputChecked: '',
    // acqInput: true,
    checkFlag: false,
    init() {
        this._super(...arguments);
        // debugger
        // if(this.isCreate) {
            // this.set('ifAcqInput', '');
            // this.set('checkFlag', false)
            // console.log(1)
        // } else {
            console.log(this.session.acquisition)
            if(this.session.acquisition == null || this.session.acquisition == '') {
                // this.set('ifAcqInput', 'disabled');
                this.set('checkFlag', true)
            } else {
                this.set('checkFlag', false)
            }
        // }

    },
    actions: {
        noAcq() {
            this.toggleProperty('checkFlag');
            this.set("session.acquisition", [])
            // if(this.session.acquisition == null || this.session.acquisition == []) {
                // this.set('ifAcqInput', 'disabled');
                // this.set('noInputChecked', 'checked');
                // this.set('session.acquisition', '');
                // this.set('acqInput', false)
            // } else {
                // this.set('ifAcqInput', '');
                // this.set('noInputChecked', '');
                // this.set('acqInput', true)
            // }

        }
    }
});
