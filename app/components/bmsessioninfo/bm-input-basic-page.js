import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    ageInput: true,
    ageInputChecked: 'checked',
    ageNoInput: '',
    levelInput: true,
    levelInputRadio: 'checked',
    levelNoRadio: '',
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
    }
});
