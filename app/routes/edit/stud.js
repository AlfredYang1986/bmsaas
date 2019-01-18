import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        return RSVP.hash({
            studid: params.studid,
            stud: this.store.find('student', params.studid),
        })
    }
});
