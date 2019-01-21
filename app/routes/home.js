import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';

export default Route.extend({
    // bm_brand_service: service(),
    // bm_login_service: service(),
    model() {
        return RSVP.hash({
            tabs: A(['品牌信息']),
            brand: this.store.findRecord('brand', localStorage.getItem("brandid"))
        })
    },
});
