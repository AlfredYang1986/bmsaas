import Route from '@ember/routing/route';
import RSVP from 'rsvp';
// import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({
    // mock_data: service(),
    bm_tech_service: service(),

    model(params) {
        this.bm_tech_service.set('techid', params.techid);

        return RSVP.hash({
                techid : params.techid,
                tabs: A(['教师信息']),
                urls: A([
                    {
                        "pageName":"教师",
                        "link":"tech",
                        "id":"",
                    },
                    {
                        "pageName":"教师信息",
                        "link":"",
                        "id":"",
                    }
                ]),
            })
    },
    setupController(controller, model) {
        this._super(controller, model);
        this.bm_tech_service.set('refresh_token', this.bm_tech_service.guid());
    },
});
