import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({

    bm_session_service: service(),

    isPushing: false,

    actions: {
        saveCourseBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('course');
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
