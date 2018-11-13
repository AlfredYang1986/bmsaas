import Controller from '@ember/controller';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
    bm_tech_service: service(),

    actions: {
        saveTechBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('tech');
                },
                onFail: function(err) {
                    console.log('error');
                }
            }
            this.bm_tech_service.saveUpdate(callback);
        },
    },
});
