import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    bm_session_service: service(),
    bm_exp_service: service(),
    isCreate: false,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('detail.exp', that.bm_exp_service.expid);
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_session_service.saveUpdate(callback);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
