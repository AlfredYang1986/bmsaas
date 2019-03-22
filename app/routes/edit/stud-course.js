import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
    },
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('cur_page_idx', 0);
        controller.set('inputVal', false);
    }
});
