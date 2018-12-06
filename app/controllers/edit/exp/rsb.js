import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

    bm_exp_service: service(),

    // cur_page_idx: 0,

    isCreate: true,

    isPushing: false,
    actions: {
        saveCourseBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('exp');
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_exp_service.saveUpdate(callback);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
