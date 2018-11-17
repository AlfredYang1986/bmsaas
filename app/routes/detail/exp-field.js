import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    bm_exp_service: service(),

    model(params) {
        this.bm_exp_service.set('expid', params.fieldid);
        return RSVP.hash({
                fieldid: params.fieldid,
                tabs: A(['场次安排', '体验详情'])
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_exp_service.set('refresh_token', this.bm_exp_service.guid());
    },
});
