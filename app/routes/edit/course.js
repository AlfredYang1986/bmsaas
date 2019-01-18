import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        return RSVP.hash({
                course : this.store.findRecord('sessioninfo', params.courseid),
            })
    },
});
