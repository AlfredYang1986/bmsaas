import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model() {
        return RSVP.hash({
            studs: this.store.findAll('student')
        })
    },
});
