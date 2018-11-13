import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    bm_tech_service: service(),

    model(params) {
        this.bm_tech_service.set('techid', params.techid);
        return RSVP.hash({
                techid : params.techid
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.tech != null) {
            controller.set('isPushing', false);
        } else {
            controller.set('isPushing', true);
        }
        this.bm_tech_service.set('refresh_token', this.bm_tech_service.guid());
    }
});
