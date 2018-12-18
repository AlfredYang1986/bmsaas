import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureActivity();
        let act = this.store.peekRecord('bmactivityinfo', params.actid);
        if (act == null) {
            this.transitionTo('home');
        } 

        let yards = this.store.peekAll('bmyard');

        return RSVP.hash({
                act: act,
                yards: yards
            })
    },
});
