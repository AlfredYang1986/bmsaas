import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        let yardid = "5c4191588fb807574ac84659";
        return RSVP.hash({
            yard: this.store.findRecord('yard', yardid),
        })
    },
});
