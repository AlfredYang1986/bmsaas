import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    bm_session_update_service: service(),

    model(params) {
        this.bm_session_update_service.set('sessionid', params.courseid);
        return RSVP.hash({
                courseid: params.courseid
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_session_update_service.set('refresh_token', this.bm_session_update_service.guid());
    },
});
