import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureTech();
        debugger
        let yard = this.store.peekRecord('bmyard', params.yardid);
        if (yard == null && params.yardid != 'yard/push') {
            this.transitionTo('home');
        } 

        return RSVP.hash({
                yard: yard
            })
    },

    setupController(controller, model) {
        this._super(controller, model);
        if (model.yard != null) {
            controller.set('yard_title', model.yard.get('title'));
            controller.set('yard_address', model.yard.get('address'));
            controller.set('yard_cover', model.yard.get('cover'));
            controller.set('yard_des', model.yard.get('description'));
            controller.set('yard_ardes', model.yard.get('ardes'));
            controller.set('yard_around', model.yard.get('around'));
            controller.set('yard_facilities', model.yard.get('facilities'));
            
            controller.set('isPushing', false);
        } else {
            controller.set('yard_title', ''),
            controller.set('yard_address', ''),
            controller.set('yard_cover', ''),
            controller.set('yard_des', ''),
            controller.set('yard_ardes', ''),
            controller.set('yard_around', ''),
            controller.set('yard_facilities', ''),
          
            controller.set('isPushing', true);
        }
    }
});
