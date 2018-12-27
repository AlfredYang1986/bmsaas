import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_brand_service: service(),
    bm_login_service: service(),
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_brand_service.set('refresh_token', this.bm_brand_service.guid());
    },
});
