import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ageInput: true,
    ageInputChecked: 'checked',
    ageNoInput: '',
    levelInput: true,
    levelInputRadio: 'checked',
    levelNoRadio: '',
    positionalParams: ['session'],
    inputChecked: 'checked',
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
                this.set('ageInputChecked', '');
                this.set('ageNoInput', 'checked');
            }
        },
        ageInputSelect() {
            if(this.ageInput == false) {
                this.set('ageInput', true);
                this.set('ageInputChecked', 'checked');
                this.set('ageNoInput', '');
                this.set('session.alb', 0);
                this.set('session.aub', 0);
            }
        },
        levelNoSelected() {
            if(this.levelInput == true) {
                this.set('levelInput', false);
                this.set('levelInputRadio', '');
                this.set('levelNoRadio', 'checked');
                this.set('session.level', '');
            }
        },
        levelInputSelected() {
            if(this.levelInput == false) {
                this.set('levelInput', true);
                this.set('levelInputRadio', 'checked');
                this.set('levelNoRadio', '');
            }
        },
        lengthInputSelected() {
            if(this.inputChecked == '') {
                this.set('lengthIf', true);
                this.set('inputChecked', 'checked');
                this.set('inputNoChecked', '');
                this.set('session.length', 0)
            }
        },
        lengthNoSelected() {
            if(this.inputChecked == 'checked') {
                this.set('lengthIf', false);
                this.set('inputChecked', '');
                this.set('inputNoChecked', 'checked');
                this.set('session.length', -1)
            }
        },
    }
});
