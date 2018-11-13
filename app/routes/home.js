import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_brand_service: service(),
    model(params) {

        this.bm_brand_service.set('brandid', '5be6a00b8fb80736e2ec9ba5');
        return RSVP.hash({
            brandid: "5be6a00b8fb80736e2ec9ba5",
        });
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_brand_service.set('refresh_token', this.bm_brand_service.guid());
    },
});
