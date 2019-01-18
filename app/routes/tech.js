import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { inject as service } from '@ember/service';

export default Route.extend({
    // bm_tech_service: service(),
    model() {
        return RSVP.hash({
            techs: this.store.findAll('teacher')
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        // this.bm_tech_service.set('refresh_all_token', this.bm_tech_service.guid());
    }
});
