import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ageInput: true,
    ageInputChecked: 'checked',
    ageNoInput: '',
    levelInput: true,
    levelInputRadio: 'checked',
    levelNoRadio: '',
    inputChecked: '',
    inputNoChecked: '',
    lengthIf: true,
    init() {
        this._super(...arguments);
        if(this.isCreate) {
            this.set('levelInputRadio', 'checked');
            this.set('levelNoRadio', '');
        } else {
            if(this.session.level == '') {
                this.set('levelInputRadio', '');
                this.set('levelNoRadio', 'checked');
                this.set('levelInput', false);
            }
        }

        if(this.session.alb == -1 & this.session.aub ==-1) {
            this.set('ageInputChecked', '');
            this.set('ageNoInput', 'checked');
            this.set('ageInput', false);
        }

        if(this.session.length == -1) {
            this.set('lengthIf', false);
            this.set('inputChecked', '');
            this.set('inputNoChecked', 'checked');
        }
    },
    actions: {
        ageSelect() {
            if(this.ageInput == true) {
                this.set('ageInput', false);
            } else {
                this.set('ageInput', true);
            }
        },
        lengthNoSelected() {
            if(this.lengthIf == true) {
                this.set('lengthIf', false);
                this.set('session.length', -1)
            } else {
                this.set('lengthIf', true);
                this.set('session.length', 0)
            }
        }
    }
});
