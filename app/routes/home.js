import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    bm_brand_service: service(),
    bm_login_service: service(),
    model() {
        return RSVP.hash({
            tabs: A(['品牌信息']),
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_brand_service.set('refresh_token', this.bm_brand_service.guid());
    },
});
