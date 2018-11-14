import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    bm_actv_service: service(),

    model(params) {
        this.bm_actv_service.set('actvid', params.actvid);
        return RSVP.hash({
                expid: params.actvid,
                tabs: A(['场次安排', '体验详情'])
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_actv_service.set('refresh_token', this.bm_actv_service.guid());
    },
});
