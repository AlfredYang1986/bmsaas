import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureStud();
        let stud = this.store.peekRecord('bmstud', params.studid);
        if (stud == null) {
            this.transitionTo('home');
        }

        return RSVP.hash({
                stud: stud
            })
    },
});
