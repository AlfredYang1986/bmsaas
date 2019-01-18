import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        let tmp = '5c4178918fb8073d04e89793';
        return RSVP.hash({
            brand: this.store.findRecord('brand', tmp)
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('cur_idx', 0);
    },
});
