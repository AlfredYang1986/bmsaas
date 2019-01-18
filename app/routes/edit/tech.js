import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            tech: this.store.find('teacher', params.techid),
        })
    },
});
