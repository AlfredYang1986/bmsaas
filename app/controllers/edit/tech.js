import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    bm_tech_service: service(),

    actions: {
        saveTechBtnClicked() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('tech');
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_tech_service.saveUpdate(callback);
        },
    },
});
