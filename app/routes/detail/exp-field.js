import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    bm_sessionable_service: service(),

    model(params) {
        this.bm_sessionable_service.set('reservableid', params.reexpid);
        this.bm_sessionable_service.set('sessionableid', params.expfieldid);
        return RSVP.hash({
                expfieldid: params.expfieldid,
                tabs: A(['场次安排', '体验详情'])
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_sessionable_service.set('refresh_token', this.bm_sessionable_service.guid());
    },
});
