import Component from '@ember/component';

export default Component.extend({
    positionalParams: ['session'],
    needNoAccSelected: '',
    needAccSelected: '',
    noAcc: true,
    init() {
        this._super(...arguments);
        if(this.session.accompany == 0) {
            this.set('noAcc', true);
        } else if(this.session.accompany == 1) {
            this.set('noAcc', false)
        }
    },
    actions: {
        needNoAcc() {
            this.set('noAcc', true);
            this.set('session.accompany', 0);
        },
        needAcc() {
            this.set('noAcc', false);
            this.set('session.accompany', 1)
        }
    }
});
