import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_tech_service: service(),

    model(params) {
        this.bm_tech_service.set('techid', params.techid);
        return RSVP.hash({
                techid : params.techid
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.techid == "tech/push") {
            controller.set('isPushing', true);
        } else {
            controller.set('isPushing', false)
        }
        this.bm_tech_service.set('refresh_token', this.bm_tech_service.guid());
    }
});
