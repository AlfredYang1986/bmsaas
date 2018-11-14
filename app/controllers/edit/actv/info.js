import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({

    bm_session_service: service(),

    isPushing: false,

    actions: {
        saveCourseBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('actv');
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