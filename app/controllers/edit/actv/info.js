import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    bm_session_service: service(),
    bm_actv_service: service(),
    isCreate: false,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(idx) {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('detail.actv', that.bm_actv_service.actvid);
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_session_service.saveUpdate(callback);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
