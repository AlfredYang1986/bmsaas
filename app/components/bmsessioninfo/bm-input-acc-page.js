import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    needNoAccSelected: '',
    needAccSelected: '',
    init() {
        this._super(...arguments);
        if(this.session.accompany == 0) {
            this.set('needNoAccSelected', 'checked');
            this.set('needAccSelected', '');
        } else if(this.session.accompany == 1) {
            this.set('needNoAccSelected', '');
            this.set('needAccSelected', 'checked');
        }
    },
    actions: {
        needNoAcc() {
            this.set('session.accompany', 0);
            this.set('needAccSelected', '');
            this.set('needNoAccSelected', 'checked')
        },
        needAcc() {
            this.set('session.accompany', 1)
            this.set('needNoAccSelected', '')
            this.set('needAccSelected', 'checked');
        }
    }
});
