import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),

    model() {
        let course = this.mock_data.queryNotReservableCourse();

        return RSVP.hash({
                course : course
            })
    },
    activate() {
        if (this.controller) {
            this.controller.set('selected_index', -1);
            this.controller.set('savedlg', false);
        }
    }
});
