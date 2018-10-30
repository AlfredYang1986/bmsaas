import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        this.mock_data.sureYard();
        let yards = this.store.peekAll('bmyard');

        return RSVP.hash({
                yards: yards
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        if (model.yards.length > 0) {
            controller.set('selectedYard', model.yards.objectAt(0).get('id'));;
        }
    }   
});
