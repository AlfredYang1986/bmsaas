import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    bm_exp_service: service(),
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_exp_service.set('refresh_all_token', this.bm_exp_service.guid());
    }
});
