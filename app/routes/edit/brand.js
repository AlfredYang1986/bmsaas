import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        this.mock_data.sureBrand();
        let tmp = this.store.peekRecord('bmbrand', 'i am a brand');
    
        return RSVP.hash({
            brand: tmp
        });
    },

    setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        controller.set('title', model.brand.get('title'));
        controller.set('subtitle', model.brand.get('subtitle'));
        controller.set('brand_story', model.brand.get('found_stroy'));
        controller.set('team_des', model.brand.get('team_des'));
    },
});
