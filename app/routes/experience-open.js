import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        this.mock_data.sureActivity();
        let acts = this.store.peekAll('bmactivityinfo');

        return RSVP.hash({
                acts: acts
            })
    },
});
