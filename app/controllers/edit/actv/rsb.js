import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    bm_actv_service: service(),

    isCreate: true,
    isPushing: false,

    actions: {
        saveCourseBtnClicked(/*idx*/) {
            let that = this
            let callback = {
                onSuccess: function(res) {
                    that.transitionToRoute('detail.actv', res.data.id);
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_actv_service.saveUpdate(callback);
        },
        reserveCourse() {
            this.transitionToRoute('courseReserve');
        },
    },
});
