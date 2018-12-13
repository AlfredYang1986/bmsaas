import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_actv_service: service(),

    // cur_page_idx: 0,
    isCreate: true,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(idx) {
            let that = this
            let callback = {
                onSuccess: function(res) {
                    that.transitionToRoute('detail.actv', res.data.id);
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_actv_service.saveUpdate(callback);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
