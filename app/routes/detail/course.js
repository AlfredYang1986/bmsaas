import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureCourse();
        let course = this.store.peekRecord('bmcourseinfo', params.courseid);
        if (course == null) {
            this.transitionTo('home');
        } 

        return RSVP.hash({
                course : course
            })
    },  
});
