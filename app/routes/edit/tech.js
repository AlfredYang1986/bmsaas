import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        let tech;
        if (params == 'tech/push') {
            tech = this.store.createRecord('teacher');
        } else {
            tech = this.store.find('teacher', params.techid);
        }

        return RSVP.hash({
            tech: tech
        })
    },
});
