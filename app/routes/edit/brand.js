import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            brand: this.store.findRecord('brand', '5c4178918fb8073d04e89793') 
        })
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('cur_idx', 0);
    },
});
