import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({

    bm_session_service: service(),

    // cur_page_idx: 0,

    isPushing: false,

    actions: {
        saveCourseBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('course');
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
