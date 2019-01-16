import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    // ifIncInput: '',
    // noInputChecked: '',
    checkFlag: false,
    init() {
        this._super(...arguments);
        // if(this.isCreate) {
        //     this.set('ifIncInput', '');
        //     this.set('incInput', true);
        // } else {
        //     if(this.session.inc == '') {
        //         this.set('ifIncInput', 'disabled');
        //         this.set('incInput', false);
        //     }
        // }
        if(this.session.inc == null || this.session.inc == '') {
            // this.set('ifAcqInput', 'disabled');
            this.set('checkFlag', true)
        } else {
            this.set('checkFlag', false)
        }
    },
    actions: {
        noInc() {
            // if(this.ifIncInput == '') {
            //     this.set('ifIncInput', 'disabled');
            //     this.set('noInputChecked', 'checked');
            //     this.set('session.inc', '');
            //     this.set('incInput', false);
            // } else {
            //     this.set('ifIncInput', '');
            //     this.set('noInputChecked', '');
            //     this.set('incInput', true);
            // }
            this.toggleProperty('checkFlag');
            this.set("session.inc", [])
        }
    }
});
