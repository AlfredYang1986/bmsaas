import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureYard();
        let yard = this.store.peekRecord('bmyard', params.yardid);
        if (yard == null) {
            this.transitionTo('home');
        } 

        return RSVP.hash({
                yard: yard
            })
    },
});
