import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { inject as service } from '@ember/service';

export default Route.extend({
    // bm_stud_service: service(),
    model() {
        return RSVP.hash({
            studs: this.store.findAll('student')
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        // this.bm_stud_service.set('page', 0);
        // this.bm_stud_service.set('refresh_all_token', this.bm_stud_service.guid());
    },
});
