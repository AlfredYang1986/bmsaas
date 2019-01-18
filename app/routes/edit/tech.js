import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        if (params.techid == "tech/push") {
            return RSVP.hash({
                isPushing: true,
                tech: this.store.createRecord('teacher'),
            })
        } else {
            return RSVP.hash({
                isPushing: false,
                tech: this.store.find('teacher', params.techid),
            })
        }
    },
});
