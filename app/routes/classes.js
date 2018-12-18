import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    mock_data: service(),
    model() {
        // this.mock_data.sureClasses();
        // let cls = this.store.peekAll('bmclass');

        // return RSVP.hash({
        //         cls: cls
        //     })
    },
});
