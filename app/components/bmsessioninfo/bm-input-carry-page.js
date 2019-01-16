import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    // ifCarryInput: '',
    // noInputChecked: '',
    checkFlag: false,
    init() {
        this._super(...arguments);
        // if(this.isCreate) {
        //     this.set('ifCarryInput', '');
        //     this.set('carryInput', true);
        // } else {
        //     if(this.session.carrying == '') {
        //         this.set('ifCarryInput', 'disabled');
        //         this.set('carryInput', false);
        //     }
        // }
        if(this.session.carrying == null || this.session.carrying == '') {
            this.set('checkFlag', true)
        } else {
            this.set('checkFlag', false)
        }
    },
    actions: {
        noCarry() {
            // if(this.ifCarryInput == '') {
            //     this.set('ifCarryInput', 'disabled');
            //     this.set('noInputChecked', 'checked');
            //     this.set('session.carrying', '');
            //     this.set('carryInput', false);
            // } else {
            //     this.set('ifCarryInput', '');
            //     this.set('noInputChecked', '');
            //     this.set('carryInput', true);
            // }
            this.toggleProperty('checkFlag');
            this.set("session.carrying", [])
        }
    }
});
