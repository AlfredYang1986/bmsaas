import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_stud_service: service(),

    model(params) {
        this.bm_stud_service.set('studid', params.studid);
        return RSVP.hash({
            studid: params.studid
        })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.studid == "stud/push") {
            controller.set('isPushing', true);
        } else {
            controller.set('isPushing', false)
        }
        this.bm_stud_service.set('refresh_token', this.bm_stud_service.guid());
    },
});
