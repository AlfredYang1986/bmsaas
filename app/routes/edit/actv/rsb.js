import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    bm_actv_service: service(),

    model() {
        this.bm_actv_service.set('actvid', 'actv/push');
        return RSVP.hash({
                actvid: 'actv/push'
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        // controller.set('cur_page_idx', 0);
        this.bm_actv_service.set('refresh_token', this.bm_actv_service.guid());
        // controller.set('refresh_token', this.bm_exp_service.guid());
    },
});
