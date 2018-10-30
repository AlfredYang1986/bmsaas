import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model(params) {
        this.mock_data.sureCourse();
        this.mock_data.sureYard();

        let courses = this.store.peekAll('bmcourseinfo');
        let yards = this.store.peekAll('bmyard');

        return RSVP.hash({
                courses: courses,
                yards: yards
            })
    },
    activate() {
        if (this.controller) {
            this.controller.set('cur_index', 0);
            this.controller.set('confirmdlg', false);
            this.controller.set('successdlg', false);
        }
    }
});
