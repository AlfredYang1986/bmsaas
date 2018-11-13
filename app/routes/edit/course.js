import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    // mock_data: service(),
    bm_session_service: service(),

    model(params) {
        this.bm_session_service.set('sessionid', params.courseid);
        return RSVP.hash({
                courseid : params.courseid
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.course != null) {
            controller.set('isPushing', false);
        } else {
            controller.set('isPushing', true);
        }
        controller.set('cur_page_idx', 0);
        this.bm_session_service.set('refresh_token', this.bm_session_service.guid());
    },
});
