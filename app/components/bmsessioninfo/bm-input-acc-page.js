import Component from '@ember/component';
import { A } from '@ember/array';
// import { computed } from '@ember/object';

export default Component.extend({
    positionalParams: ['session'],
    needNoAccSelected: '',
    needAccSelected: '',
    noAcc: true,

    // acc: computed('acc_idx', function() {
    //     if(this.acc_idx == 1) {
    //         this.model.stud.set('gender', 0);
    //     } else {
    //         this.model.stud.set('gender', 1);
    //     }
    // }),

    accCheck: A(['不需要家长陪同', '需要家长陪同']),

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
