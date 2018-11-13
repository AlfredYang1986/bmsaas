import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_stud_service: service(),

    genderCheck: ['男', '女'],

    actions: {
        saveInputBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('stud');
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_stud_service.saveUpdate(callback);
        },
    },
});
