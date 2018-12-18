import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Controller.extend({
    bm_brand_service: service(),

    cur_idx: 0,

    actions: {
        saveBrand() {
            let that = this
            let callback = {
                onSuccess: function() {
                    that.transitionToRoute('home');
                },
                onFail: function(/*err*/) {
                    debug('error');
                }
            }
            this.bm_brand_service.saveUpdate(callback); 
        }
    },
});
